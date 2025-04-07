import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from '../../consts';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'iot-callback',
  imports: [CommonModule],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss',
})
export class CallbackComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);
    private httpClient = inject(HttpClient);
    private router = inject(Router);

    ngOnInit(): void {
        const code = this.activatedRoute.snapshot.queryParamMap.get('code');
        const state = this.activatedRoute.snapshot.queryParamMap.get('state');
        const storedState = sessionStorage.getItem('state');

        // Verify state to prevent CSRF
        if (state !== storedState) {
            console.error('State mismatch');
            this.router.navigate([ROUTES.AUTH]);
            return;
        }

        if (!code) {
            console.error('No authorization code received');
            this.router.navigate([ROUTES.AUTH]);
            return;
        }

        this.exchangeCodeForToken(code);
    }

    private exchangeCodeForToken(code: string): void {
        const codeVerifier = sessionStorage.getItem('codeVerifier');

        if (!codeVerifier) {
            console.error('No code verifier found');
            this.router.navigate([ROUTES.AUTH]);
            return;
        }

        const tokenUrl = 'https://github.com/login/oauth/access_token';
        const body = new URLSearchParams();
        body.set('client_id', environment.clientId);
        body.set('code', code);
        body.set('redirect_uri', environment.redirectUri);
        body.set('code_verifier', codeVerifier);

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        });
        console.log(tokenUrl);

        this.httpClient.post(tokenUrl, body.toString(), { headers }).subscribe({
            next: (response: any) => {
                console.log(response);
                const accessToken = response.access_token;
                localStorage.setItem('access_token', accessToken); // Store token

                // Clean up session storage
                sessionStorage.removeItem('codeVerifier');
                sessionStorage.removeItem('state');

                this.router.navigate([ROUTES.DASHBOARD]); // Navigate to your app's main page
            },
            error: error => {
                console.error('Error exchanging code for token', error);
                this.router.navigate([ROUTES.AUTH]);
            },
        });
    }
}

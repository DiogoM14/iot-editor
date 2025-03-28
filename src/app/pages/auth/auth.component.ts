import { Component } from '@angular/core';
import { computeCodeChallenge, generateCodeVerifier, generateState } from '../../services/helpers';
import { environment } from '../../../environments/environment';
import { GithubService } from '../../services/state/github.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'iot-auth',
    imports: [],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    providers: [GithubService],
})
export class AuthComponent {
    constructor(private githubService: GithubService) {
        this.githubService.getUserProfile().subscribe(x => console.log(x));
    }

    async login(): Promise<void> {
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await computeCodeChallenge(codeVerifier);
        const state = generateState();

        // Store codeVerifier and state in session storage
        sessionStorage.setItem('codeVerifier', codeVerifier);
        sessionStorage.setItem('state', state);

        const authUrl =
            `https://github.com/login/oauth/authorize?` +
            `client_id=${environment.clientId}&` +
            `redirect_uri=${environment.redirectUri}&` +
            `scope=user&` + // Request access to user profile; adjust scopes as needed
            `response_type=code&` +
            `state=${state}&` +
            `code_challenge=${codeChallenge}&` +
            `code_challenge_method=S256`;

        window.location.href = authUrl; // Redirect to GitHub
    }
}

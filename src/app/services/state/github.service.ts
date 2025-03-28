import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GithubService {
    private http = inject(HttpClient);

    getUserProfile(): Observable<any> {
        const accessToken = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${accessToken}`,
        });
        return this.http.get('https://api.github.com/user', { headers });
    }
}

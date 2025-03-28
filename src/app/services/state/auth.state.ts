import { Injectable } from '@angular/core';
import { computeCodeChallenge, generateCodeVerifier, generateState } from '../helpers';
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public isAuthenticated(): boolean {
        return true;
    }
}

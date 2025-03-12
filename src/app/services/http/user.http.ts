import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../dtos';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserHttpService {
    private httpClient = inject(HttpClient);

    public getUsers$(): Observable<UserDTO[]> {
        return this.httpClient.get<UserDTO[]>(`/users`);
    }
}

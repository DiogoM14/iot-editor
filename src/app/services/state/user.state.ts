import { UserState } from '../../models/user.model';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserHttpService } from '../http';
import { mapUsersDTOToUsersModel } from '../mappers';

@Injectable()
export class UserStateService {
    private initialUserState: UserState = {
        data: null,
        error: null,
        loading: false,
    };

    private userState = new BehaviorSubject<UserState>(this.initialUserState);
    private userHttpService = inject(UserHttpService);

    public getUsersState(): Observable<UserState> {
        return this.userState.asObservable();
    }

    public fetchUsers(): void {
        this.updateUsersState({ loading: true, error: null });
        this.userHttpService.getUsers$().subscribe({
            next: users =>
                this.updateUsersState({ data: mapUsersDTOToUsersModel(users), loading: false }),
            error: error => this.updateUsersState({ error, loading: false }),
        });
    }

    private updateUsersState(newState: Partial<UserState>): void {
        const currentState = this.userState.getValue();
        this.userState.next({ ...currentState, ...newState });
    }
}

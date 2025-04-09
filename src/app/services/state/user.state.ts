import { UserModel } from '../../models';
import { inject, Injectable } from '@angular/core';
import { UserHttpService } from '../http';
import { mapUsersDTOToUsersModel } from '../mappers';
import { GenericState, GenericStateManagerService } from './generic-state-manager';

@Injectable()
export class UserStateService extends GenericStateManagerService<UserModel> {
    private userHttpService = inject(UserHttpService);

    public fetchUsers(): void {
        this.updateUsersState({ loading: true, error: null });
        this.userHttpService.getUsers$().subscribe({
            next: users =>
                this.updateUsersState({ data: mapUsersDTOToUsersModel(users), loading: false }),
            error: error => this.updateUsersState({ error, loading: false }),
        });
    }

    private updateUsersState(newState: Partial<GenericState<UserModel>>): void {
        const currentState = this.state.getValue();
        this.state.next({ ...currentState, ...newState });
    }
}

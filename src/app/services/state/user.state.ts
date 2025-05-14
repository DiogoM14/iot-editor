import { UserModel } from '../../models';
import { inject, Injectable } from '@angular/core';
import { UserHttpService } from '../http';
import { mapUsersDTOToUsersModel } from '../mappers';
import { GenericState, GenericStateManagerService } from './generic-state-manager';

@Injectable()
export class UserStateService extends GenericStateManagerService<UserModel> {
    private userHttpService = inject(UserHttpService);

    public fetchUsers(): void {
        this.updateState({ loading: true, error: null });
        this.userHttpService.getUsers$().subscribe({
            next: users =>
                this.updateState({ data: mapUsersDTOToUsersModel(users), loading: false }),
            error: error => this.updateState({ error, loading: false }),
        });
    }
}

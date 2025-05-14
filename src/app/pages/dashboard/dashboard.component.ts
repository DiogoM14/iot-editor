import { Component, effect, inject, Signal } from '@angular/core';
import { UserHttpService, UsersStateService } from '../../services';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserState } from '../../models';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'iot-dashboard',
  imports: [
    JsonPipe
  ],
    providers: [UsersStateService, UserHttpService],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    private userState = inject(UsersStateService);
    private userHttpService = inject(UserHttpService);

    public selectedNumber: number = 0;
    public userData: Signal<UserState | null> = toSignal(this.userState.getState(), {
        initialValue: null,
    });

    constructor() {
        effect(() => {
            this.userHttpService.getUsers$();
        });
    }
}

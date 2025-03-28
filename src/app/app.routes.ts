import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ROUTES } from './consts';
import { anonymousGuard, authGuard } from './guards';
import { AuthService } from './services';
import { CallbackComponent } from './pages/callback/callback.component';

export const routes: Routes = [
    {
        path: ROUTES.AUTH,
        component: AuthComponent,
        canActivate: [!authGuard],
    },
    {
        path: ROUTES.DASHBOARD,
        component: DashboardComponent,
        canActivate: [authGuard],
    },
    {
        path: '',
        redirectTo: () => {
            const authService = inject(AuthService);
            return authService.isAuthenticated() ? ROUTES.DASHBOARD : ROUTES.AUTH;
        },
        pathMatch: 'full',
    },
    { path: ROUTES.CALLBACK, component: CallbackComponent },
    { path: '**', component: PageNotFoundComponent },
];

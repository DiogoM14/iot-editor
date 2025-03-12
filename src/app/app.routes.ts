import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ROUTES } from './consts';
import { anonymousGuard, authGuard } from './guards';
import { AuthService } from './services';

export const routes: Routes = [
    {
        path: ROUTES.REGISTER,
        component: RegisterComponent,
        canActivate: [anonymousGuard],
    },
    {
        path: ROUTES.LOGIN,
        component: LoginComponent,
        canActivate: [anonymousGuard],
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
            return authService.isAuthenticated() ? ROUTES.DASHBOARD : ROUTES.LOGIN;
        },
        pathMatch: 'full',
    },
    { path: '**', component: PageNotFoundComponent },
];

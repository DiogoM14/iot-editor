import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSideNavComponent } from './components/app-side-nav/app-side-nav.component';
import { AuthService } from './services';
import { AuthComponent } from './pages/auth/auth.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AppHeaderComponent, AppSideNavComponent, AuthComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    private authService = inject(AuthService);
    public isUserAuthenticated = this.authService.isAuthenticated();
}

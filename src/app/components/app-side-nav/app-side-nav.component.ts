import { Component, inject } from '@angular/core';
import { SideNavItemsConfig } from './config/side-nav-items.config';
import { SideNavItem } from './types/side-nav-items.type';
import { allThemes, ThemeService } from '../../services/state/theme.state';

@Component({
    selector: 'iot-app-side-nav',
    imports: [],
    templateUrl: './app-side-nav.component.html',
    styleUrl: './app-side-nav.component.scss',
})
export class AppSideNavComponent {
    public sideNavItems: SideNavItem[] = SideNavItemsConfig;

    public themService = inject(ThemeService);

    themes = allThemes;

    toggleTheme(target: EventTarget | null) {
        if (target instanceof HTMLInputElement) {
            const theme = target.checked ? 'light' : 'dracula';
            this.themService.setTheme(theme);
        }
    }
}

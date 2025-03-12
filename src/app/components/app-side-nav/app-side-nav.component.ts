import { Component } from '@angular/core';
import { SideNavItemsConfig } from './config/side-nav-items.config';
import { SideNavItem } from './types/side-nav-items.type';

@Component({
    selector: 'iot-app-side-nav',
    imports: [],
    templateUrl: './app-side-nav.component.html',
    styleUrl: './app-side-nav.component.scss',
})
export class AppSideNavComponent {
    public sideNavItems: SideNavItem[] = SideNavItemsConfig;
}

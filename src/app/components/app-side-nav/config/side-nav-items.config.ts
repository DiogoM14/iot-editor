import { ROUTES } from '../../../consts';
import { SideNavItem } from '../types/side-nav-items.type';

export const SideNavItemsConfig: SideNavItem[] = [
    { icon: 'space_dashboard', label: 'Dashboard', route: ROUTES.DASHBOARD },
    { icon: 'memory', label: 'Modules', route: '/help' },
    { icon: 'devices_other', label: 'Devices', route: '/help' },
    { icon: 'group', label: 'User', route: '/help' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
];

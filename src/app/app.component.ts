import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSideNavComponent } from './components/app-side-nav/app-side-nav.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AppHeaderComponent, AppSideNavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}

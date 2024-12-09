import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SvgLoaderComponent } from './common/icons/svg-loader.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@Component({
    selector: 'app-root',
    template: `
    <app-nav-menu/>
    <main>
        <router-outlet/>
    </main>
    <svg-loader [src]="icons"/>
  `,
    imports: [
        RouterOutlet,
        SvgLoaderComponent,
        NavMenuComponent
    ]
})
export class AppComponent {
    title = 'expense-tracker';

    icons = 'assets/sprites/icons.svg'

}

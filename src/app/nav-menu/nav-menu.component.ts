import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SvgIconComponent } from '../common/icons/svg-icon.component';

@Component({
    selector: 'app-nav-menu',
    template: `
    <nav class="navbar">
         <a class="navbar-brand" routerLink="/">
            <h3>Expense<span>Tracker</span></h3>
         </a>
         <ul class="navbar-nav">
            @for(nav of menu; track nav) {
                <li class="nav-item" routerLinkActive="link-active">
                    <a class="nav-link" [routerLink]="[nav]">
                        <svg-icon [name]="nav"/>
                        <span>{{nav}}</span>
                    </a>
                </li>
            }
         </ul>
    </nav>
    `,
    styles: [`
        @use 'index';
        :host {
            height: 100%;
            width: 240px;
        
            .navbar {
                .navbar-brand {
                    text-align: center;
                    margin: 40px 6px 32px 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    span {
                        color: index.$orange;
                    }
                }
                .navbar-nav {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding: 0px 20px;

                    .nav-item {
                        .nav-link {
                            display: flex;
                            width: 200px;
                            padding: 10px 20px;
                            align-items: center;
                            gap: 14px;

                            text-decoration: none;
                            text-transform: capitalize;

                            svg-icon {
                                display: flex;
                                width: 24px;
                                height: 24px;
                            }
                            span {
                                color: #232323;
                                font-size: 14px;
                                font-style: normal;
                                font-weight: 400;
                                line-height: 22px
                            }
                        }

                        &.link-active {
                            border-radius: index.$border-radius;;
                            background: index.$white;
                        }
                    }
                }
            }
        }
    `],
    imports: [
        RouterLink, RouterLinkActive,
        SvgIconComponent
    ]
})
export class NavMenuComponent {

    readonly account = input();
    readonly accountsLength = input<number>();

    protected menu = [
        /*dashboard*/
        'transactions',
        'categories',
        /*'settings',*/
    ]

}

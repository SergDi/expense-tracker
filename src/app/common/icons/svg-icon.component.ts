import { Component, input } from '@angular/core';

@Component({
    selector: 'svg-icon',
    template: `
        <svg [attr.viewBox]="viewBox">
            <use [attr.xlink:href]="'#'+ name() "></use>
        </svg>
    `
})
export class SvgIconComponent {

    name = input<string>()
    viewBox = '0 0 24 24';
}

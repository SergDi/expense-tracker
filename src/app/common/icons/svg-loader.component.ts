import { Component, ElementRef, OnChanges, inject, input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'svg-loader',
    template: ``,
})
export class SvgLoaderComponent implements OnChanges {

    private readonly elementRef = inject(ElementRef)
    private readonly http = inject(HttpClient)

    src = input<string>()

    ngOnChanges() {

        const el: HTMLElement = this.elementRef.nativeElement

        if (this.src()) {     
            this.http.get(`${this.src()}`, { responseType: 'text' }).subscribe(svg => el.innerHTML = svg.toString())
        }
    }
}
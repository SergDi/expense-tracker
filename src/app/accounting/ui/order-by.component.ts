import { Component, input, output } from '@angular/core';
import { SvgIconComponent } from "../../common/icons/svg-icon.component";
import { orderType, SortBy } from '../../shared/types/common.types';

function asKeyOf<T>(key: string): keyof T { return key as keyof T; }

@Component({
    selector: 'order-by',
    template: `
        <button (click)="onSortBy()">
            @if(isCurrent(key())) {
                @if(isAsc()) {
                    <svg-icon name="sort-up"/>
                } @else {
                    <svg-icon name="sort-down"/>
                }
            } @else {
                <svg-icon name="sort"/>
            }
        </button>
    `,
    imports: [SvgIconComponent]
})
export class OrderByComponent<T> {

    key = input.required<string>()
    sortBy = input<SortBy<T>>()
    sort = output<SortBy<T>>()

    onSortBy() {
        const value = {
            key: asKeyOf<T>(this.key()),
            order: this.isAsc() ? 'desc' : 'asc' as orderType
        }
        this.sort.emit(value)
    }

    isCurrent(key: string) {
        const sortBy = this.sortBy()
        return sortBy?.key === key
    }

    isAsc() {
        const sortBy = this.sortBy()
        return sortBy?.order === 'asc'
    }
}

import { Component, input, output, PipeTransform, TemplateRef } from '@angular/core';
import { SvgIconComponent } from "../../common/icons/svg-icon.component";
import { OrderByComponent } from './order-by.component';
import { SortBy } from '../../shared/types/common.types';
import { FormatValuePipe } from './format-value.pipe';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../../common/dropdown/dropdown.component';
import { DropdownDirective } from '../../common/dropdown/dropdown.directive';
import { StopPropagationDirective } from '../../common/directives/stop-propagation.directive';

@Component({
    selector: 'list',
    template: `
    <div class="table" role="table">
        <div class="table-header" role="rowgroup">
            <div class="table-row" role="row">
                @for (row of schema(); track $index) {
                    <div class="table-cell" role="columnheader">
                        <div class="header">
                            @if(hasFilter(row.key)) { 
                                <button type="button" [appDropdown]="dropdownTemplate">
                                    <svg-icon name="filter"/>
                                </button> 
                                <app-dropdown #dropdownTemplate>
                                    <div stopPropagation>
                                        <ng-container [ngTemplateOutlet]="hasFilter(row.key)?.template || null" [ngTemplateOutletContext]="{ model: hasFilter(row.key)?.model }"/>
                                    </div>
                                </app-dropdown>
                            }
                            <span>{{ row.key }}</span>
                            @if(sortBy()) {
                                <order-by [sortBy]="sortBy()" [key]="row.key" (sort)="sort.emit($event)"/>
                            }
                        </div>
                    </div>
                }
                <div class="table-cell" role="columnheader">
                    <span>Actions</span>
                </div>
            </div>
        </div>
        <div  class="table-body"  role="rowgroup">
            @for (item of model(); track $index) {
                <div class="table-row" role="row">
                    @for (row of schema(); track $index) {
                        <div class="table-cell" role="cell"><span>{{ getCell(item, row.key) | formatValue: row.type: row.format }}</span></div>
                    }              
                    <div  class="table-cell" role="cell">
                        <div class="actions">
                            <button (click)="edit.emit(item)" title="Edit"><svg-icon name="edit"/></button>
                            <button (click)="remove.emit(item)" title="Remove"><svg-icon name="delete"/></button>
                        </div>
                    </div>
                </div>
            } @empty {
                <div class="empty-state">
                    <p>No items to display</p>
                </div>
            }
        </div>
    </div>
    <ng-content/>
    `,
    imports: [
        CommonModule,
        SvgIconComponent,
        OrderByComponent,
        DropdownComponent,
        DropdownDirective,
        StopPropagationDirective,
        FormatValuePipe
    ]
})
export class ListComponent<T> {

    model = input.required<T[]>()
    schema = input.required<{ key: string; type: PipeTransform | null, format: string | null }[]>()
    filters = input<{ key: string;  model: object, template: TemplateRef<object> }[]>()

    sortBy = input<SortBy<T>>()
    sort = output<SortBy<T>>()

    edit = output<T>()
    remove = output<T>()

    getCell(item: T, key: string) {
        return item[key as keyof T]
    }

    hasFilter(key: string) {

        const filters = this.filters()  
        if(filters) {
            const filter = filters?.find(f => f.key === key)
            return filter || null;
        }

        return null
    }

    
}

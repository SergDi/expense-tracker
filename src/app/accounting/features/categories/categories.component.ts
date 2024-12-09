import { Component, inject } from '@angular/core';
import { CategoryEditComponent } from './ui/category-edit.component';
import { ListComponent } from '../../ui/list.component';
import { Category } from '../../domain/entities/category';
import { AccountingFacade } from '../../domain/application/accounting.facade';
import { useModalDialog } from '../../../common/modal/modal.service';

@Component({
    selector: 'categories',
    template: `
    <h1>Categories</h1>
    <article>
        <div class="header">
            <div class="counter">{{categoriesLength()}} Categories</div>
            <button (click)="addCategory()" class="add">
                <span>Add Category</span>
            </button>
        </div>
        <list [model]="categories()" [schema]="schema" (edit)="editCategory($event)" (remove)="deleteCategory($event)"/>
    </article>
    `,
    imports: [
        ListComponent
    ]
})
export class CategoriesComponent {

    protected readonly dialog = useModalDialog()
    protected readonly accountingFacade = inject(AccountingFacade)

    categories = this.accountingFacade.categories
    categoriesLength = this.accountingFacade.categoriesLength

    category: Category = {
        id: 0,
        name: ''
    }

    schema = Object.keys(this.category).map(key => ({ key, type: null, format: null }))

    addCategory() {
        this.editCategory({ ...this.category })
    }

    editCategory(model: Category) {
        this.dialog
            .open(CategoryEditComponent, { initialState: { model } })
            .afterClosed()
            .subscribe(model => {
                if (model) this.accountingFacade.addCategory(model)
            })
    }

    deleteCategory(model: Category) {
        this.accountingFacade.deleteCategory(model)
    }

}


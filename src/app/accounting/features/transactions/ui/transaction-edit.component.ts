import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

import { ModalComponent } from '../../../../common/modal/modal.component';

import { Transaction } from '../../../domain/entities/transaction';
import { Category } from '../../../domain/entities/category';
import { SvgIconComponent } from "../../../../common/icons/svg-icon.component";
import { FloatValidatorDirective } from '../../../../common/directives/float-validator.directive';

@Component({
    selector: 'transaction-edit',
    template: `
        <form class="modal" (submit)="submit(form)" #form="ngForm">
            <header>
                <h3>{{ model.id ? 'Edit' : 'Add' }} Transaction</h3>
                <button (click)="close()"><svg-icon name="close"/></button>
            </header>
            <div class="modal-body">
                <div class="form-group">
                    <label>Name</label>
                    <input [(ngModel)]="model.name" name="name" placeholder="Name" required/>
                    @if(form.hasError('required', ['name']) && form.submitted) {
                        <small class="error">Please enter Name.</small>
                    }
                </div>
                <div class="form-group">
                    <label>Amount</label>
                    <input [(ngModel)]="model.amount" name="amount" placeholder="Amount" type="number" step="0.01" required floatValidator/>
                    @if(form.hasError('required', ['amount']) && form.submitted) {
                        <small class="error">Please enter Amount.</small>
                    }
                    @if(form.hasError('floatError', ['amount']) && form.submitted) {
                        <small class="error">Please enter correct Amount.</small>
                    }
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input [(ngModel)]="model.date" name="date" bsDatepicker [bsConfig]="{ containerClass: 'theme-orange' }"/>
                </div>
                <div class="form-group">
                    <label>Type</label>
                    <ng-select [(ngModel)]="model.type" [items]="types()" name="type" clearable="false"></ng-select>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <ng-select [(ngModel)]="model.categoryId" [items]="categories()"  name="category" bindLabel="name" bindValue="id" clearable="false"></ng-select>
                </div>
            </div>
            <footer>
                <button type="button" (click)="close()">Close</button>
                <button type="submit" class="add">Save</button>
            </footer>
        </form>
    `,
    imports: [
        FormsModule,
        NgSelectComponent,
        BsDatepickerModule,
        BsDatepickerDirective,
        SvgIconComponent,
        FloatValidatorDirective,
    ]
})
export class TransactionEditComponent extends ModalComponent<Transaction> {

    categories = input<Category[]>()
    types = input<string[]>()


    submit(form: NgForm) {

       if(form.invalid) return

       this.save()
    }
}

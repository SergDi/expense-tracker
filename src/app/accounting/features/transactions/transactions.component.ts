import { AfterViewInit, Component, inject, Signal, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Transaction, TransactionType } from '../../domain/entities/transaction';
import { TransactionEditComponent } from './ui/transaction-edit.component';
import { ListComponent } from '../../ui/list.component';
import { AccountingFacade } from '../../domain/application/accounting.facade';
import { useModalDialog } from '../../../common/modal/modal.service';

import { SortBy } from '../../../shared/types/common.types';
import { CategoryNamePipe } from '../categories/category-pipe.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BalanceWidgetComponent } from "./ui/balance-widget.component";

export function initType(transaction: Transaction, key: string) {

    const datePipe = inject(DatePipe);
    const currencyPipe = inject(CurrencyPipe);
    const categoryNamePipe = inject(CategoryNamePipe);

    const value = transaction[key as keyof Transaction]
    
    if (key === 'categoryId') {
        return { type: categoryNamePipe, format: null};
    }
    if (key === 'amount') {
        return { type: currencyPipe, format: null };
    }
    if (value instanceof Date) {
        return { type: datePipe, format: 'short' };
    }

    return { type: null, format: null }
}

@Component({
    selector: 'transactions',
    template: `
    <h1>Finances</h1>
    <balance-widget [balance]="balance()" [income]="income()" [expense]="expense()"/>

    <!-- <article>  
        <h3>Filters</h3>
        <section>
            <label>Type</label>
            <ng-select [ngModel]="filterType()" (ngModelChange)="onFilterType($event)" [items]="types"></ng-select>
        </section>
        <section>
            <label>Category</label>
            <ng-select [ngModel]="filterCategory()" (ngModelChange)="onFilterCategory($event)" [items]="categories()" bindLabel="name" bindValue="id"></ng-select>
        </section>
    </article> -->

    <article>
        <div class="header">
            <div class="counter">{{transactionsFilteredLength()}} of {{transactionsLength()}} Transactions</div>
            <button (click)="addTransaction()" class="add">
                <span>Add Transaction</span>
            </button>
        </div>
        <list 
            [model]="transactions()" 
            [schema]="schema"
            [filters]="filters()"
            [sortBy]="sortBy()" (sort)="sort($event)" 
            (edit)="editTransaction($event)" (remove)="deleteTransaction($event)">
        </list>

        <ng-template #filterType let-model="model" >
                <section>
                    <ng-select [ngModel]="model" (ngModelChange)="onFilterType($event)" [items]="types" appendTo="body"></ng-select>
                </section>
            </ng-template>

            <ng-template #filterCategory let-model="model" >
                <section>
                    <ng-select [ngModel]="model" (ngModelChange)="onFilterCategory($event)" [items]="categories()" bindLabel="name" bindValue="id" appendTo="body"></ng-select>
                </section>
            </ng-template>
    </article>
    `,
    imports: [
        FormsModule,
        NgSelectComponent,
        ListComponent,
        BalanceWidgetComponent
    ],
    providers: [
        DatePipe,
        CategoryNamePipe,
        CurrencyPipe
    ]
})
export class TransactionsComponent implements AfterViewInit {

    protected readonly dialog = useModalDialog()
    protected readonly accountingFacade = inject(AccountingFacade)

    categories = this.accountingFacade.categories

    transactions = this.accountingFacade.transactions
    sortBy = this.accountingFacade.sortBy
    income = this.accountingFacade.income
    expense = this.accountingFacade.expense
    balance = this.accountingFacade.balance

    filterType = this.accountingFacade.filterType
    filterCategory = this.accountingFacade.filterCategory

    transactionsLength = this.accountingFacade.transactionsLength
    transactionsFilteredLength = this.accountingFacade.transactionsFilteredLength

    transaction: Transaction = {
        id: 0,
        date: new Date,
        name: '',
        amount: 0,
        type: TransactionType.income,
        categoryId: 0,
    }

    types = [TransactionType.income, TransactionType.expense]

    schema = Object.keys(this.transaction).map(key => ({ key, ...initType(this.transaction, key) }))

    @ViewChild('filterType') private tmplFilterType!: TemplateRef<object>;
    @ViewChild('filterCategory') private tmpFilterCategory!: TemplateRef<object>;

    filters = signal<{ key: string; model: any, template: TemplateRef<object> }[]>([])

    addTransaction() {
        this.editTransaction({ ...this.transaction })
    }

    editTransaction(model: Transaction) {
        this.dialog
            .open(TransactionEditComponent, { initialState: { model, categories: this.categories(), types: this.types } })
            .afterClosed()
            .subscribe(model => {
                if (model) this.accountingFacade.addTransaction(model)
            })
    }

    deleteTransaction(model: Transaction) {
        this.accountingFacade.deleteTransaction(model)
    }

    sort(value: SortBy<Transaction>) {
        this.accountingFacade.sort(value)
    }

    onFilterType(value: TransactionType) {
        this.accountingFacade.setFilterType(value)
    }

    onFilterCategory(value: number) {
        this.accountingFacade.setFilterCategory(value)
    }

    ngAfterViewInit() {
       this.filters.set([{key: 'type', model: this.filterType(),  template: this.tmplFilterType}, {key: 'categoryId', model: this.filterCategory(), template: this.tmpFilterCategory}]) 
    }
}

import { inject, Injectable } from '@angular/core';
import { AccountingStore } from '../state/accounting.store';
import { Transaction, TransactionType } from '../entities/transaction';
import { Category } from '../entities/category';
import { SortBy } from '../../../shared/types/common.types';

@Injectable({
    providedIn: 'root'
})
export class AccountingFacade {

    protected readonly store = inject(AccountingStore)

    readonly categories = this.store.categories
    readonly categoriesLength = this.store.categoriesLength

    readonly transactions = this.store.transactions
    readonly sortBy = this.store.sortBy
    readonly income = this.store.income
    readonly expense = this.store.expense
    readonly balance = this.store.balance

    readonly filterType = this.store.filterType
    readonly filterCategory = this.store.filterCategory

    readonly transactionsLength = this.store.transactionsLength
    readonly transactionsFilteredLength = this.store.transactionsFilteredLength

    getTransactions() {
        this.store.getTransactions()
    }

    deleteTransaction(model: Transaction) {
        this.store.deleteTransaction(model)
    }

    addTransaction(model: Transaction) {
        this.store.addTransaction(model)
    }

    sort(value: SortBy<Transaction>) {
        this.store.setSortBy(value)  
    }

    setFilterType(value: TransactionType) {
        this.store.setFilterType(value)
    }

    setFilterCategory(value: number) {
        this.store.setFilterCategory(value)
    }


    getCategories() {
        this.store.getCategories()
    }

    deleteCategory(model: Category) {
        this.store.deleteCategory(model)
    }

    addCategory(model: Category) {
        this.store.addCategory(model)
    }

}
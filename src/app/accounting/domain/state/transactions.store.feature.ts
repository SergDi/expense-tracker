import { computed, inject } from '@angular/core';
import { patchState, signalStoreFeature, type, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { addEntities, addEntity, entityConfig, removeEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { TransactionsService } from '../infrastructure/accounting.service';
import { Transaction, TransactionType } from '../entities/transaction';
import { SortBy } from '../../../shared/types/common.types';
import { sortArrayByKey } from '../../../shared/utils/array-utils';

export interface AccountingState {
    loading: boolean;
    error: string | null,
    sortBy: SortBy<Transaction>,
    filterType: TransactionType | null;
    filterCategory: number | null;
}

const initialState: AccountingState = {
    loading: false,
    error: null,
    sortBy: {
        key: 'id',
        order: 'asc'
    },
    filterType: null,
    filterCategory: null,
}

const transactionsConfig = entityConfig({
    entity: type<Transaction>(),
    collection: 'transactions',
    selectId: (transaction) => transaction?.id,
});

export function withTransactions() {
    return signalStoreFeature(
        withState(initialState),
        withEntities(transactionsConfig),
        withComputed(({ transactionsEntities, sortBy, filterType, filterCategory }) => ({
            transactions: computed(() => {
                
                let transactions = transactionsEntities()
                const sort = sortBy()

                if (filterType()) {
                    transactions = transactions.filter(f => f.type === filterType())
                }
                if (filterCategory()) {
                    transactions = transactions.filter(f => f.categoryId === filterCategory())
                }
                return sortArrayByKey(transactions, sort.key, sort.order);
            }),
            transactionsLength: computed(() => {
                const transactions = transactionsEntities()
                return transactions.length
            }),
            transactionsFilteredLength: computed(() => {
                let transactions = transactionsEntities()

                if (filterType()) {
                    transactions = transactions.filter(f => f.type === filterType())
                }
                if (filterCategory()) {
                    transactions = transactions.filter(f => f.categoryId === filterCategory())
                }

                return transactions.length
            }),
            income: computed(() => {
                const transactions = transactionsEntities()
                return transactions.filter(f => f.type === TransactionType.income).map(m => m.amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            }),
            expense: computed(() => {
                const transactions = transactionsEntities()
                return transactions.filter(f => f.type === TransactionType.expense).map(m => m.amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            }),
            balance: computed(() => {
                const transactions = transactionsEntities()
                const income = transactions.filter(f => f.type === TransactionType.income).map(m => m.amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                const expense = transactions.filter(f => f.type === TransactionType.expense).map(m => m.amount).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

                return income - expense
            }),
        })),
        withMethods((store) => ({
            setSortBy(sortBy: SortBy<Transaction>) {
                patchState(store, () => ({ sortBy }))
            },
            setLoading(loading: boolean) {
                patchState(store, () => ({ loading }))
            },
            setFilterType(filterType: TransactionType) {
                patchState(store, () => ({ filterType }))
            },
            setFilterCategory(filterCategory: number) {
                patchState(store, () => ({ filterCategory }))
            },
        })),
        withMethods((store, transactionsService = inject(TransactionsService)) => ({
            getTransactions() {
                store.setLoading(true)

                const transactions = transactionsService.getList()
                patchState(store, addEntities(transactions, transactionsConfig))

                store.setLoading(false)
            },
            deleteTransaction(model: Transaction) {
                store.setLoading(true)

                transactionsService.deleteItem(item => item.id === model.id)
                patchState(store, removeEntity(model.id, transactionsConfig))

                store.setLoading(false)
            },
            addTransaction(model: Transaction) {
                store.setLoading(true)

                if (model.id) {
                    const item = transactionsService.updateItem(model, item => item.id === model.id)
                    patchState(store, updateEntity({ id: model.id, changes: { ...item } }, transactionsConfig))
                } else {
                    const newItem = transactionsService.addItem(model, (item, array) => { item.id = array.length + 1; return item })
                    patchState(store, addEntity(newItem, transactionsConfig))
                }

                store.setLoading(false)
            },
        })),
        withHooks({
            onInit(store) {
                store.getTransactions()
            },
        }),
    )
}
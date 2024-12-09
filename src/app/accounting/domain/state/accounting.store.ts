
import { signalStore } from '@ngrx/signals';
import { withTransactions } from './transactions.store.feature';
import { withCategories } from './categories.store.feature';

export const AccountingStore = signalStore(
    { providedIn: 'root' },
    withTransactions(),
    withCategories()
)


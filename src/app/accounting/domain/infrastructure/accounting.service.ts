import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Transaction } from '../entities/transaction';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService extends DataService<Transaction> {

    override key = 'transactions'
}

export interface Transaction {
    id: number;
    name: string;
    amount: number;
    type: TransactionType;
    categoryId: number;
    date: Date;
}

export enum TransactionType {
    income = 'Income',
    expense = 'Expense'
}

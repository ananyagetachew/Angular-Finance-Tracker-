import { createAction, props } from '@ngrx/store';
import { Transaction, CurrencyRate } from '../models/transaction.model';

export const addTransaction = createAction(
  '[Finance] Add Transaction',
  props<{ transaction: Transaction }>()
);

export const deleteTransaction = createAction(
  '[Finance] Delete Transaction',
  props<{ id: number }>()
);

export const updateTransaction = createAction(
  '[Finance] Update Transaction',
  props<{ transaction: Transaction }>()
);

export const loadTransactions = createAction('[Finance] Load Transactions');

export const loadTransactionsSuccess = createAction(
  '[Finance] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);

export const updateCurrencyRates = createAction(
  '[Finance] Update Currency Rates',
  props<{ rates: CurrencyRate[] }>()
);
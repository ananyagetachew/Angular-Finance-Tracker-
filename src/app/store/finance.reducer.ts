import { createReducer, on } from '@ngrx/store';
import { Transaction, CurrencyRate } from '../models/transaction.model';
import * as FinanceActions from './finance.actions';

export interface FinanceState {
  transactions: Transaction[];
  currencyRates: CurrencyRate[];
  selectedCurrency: string;
}

export const initialState: FinanceState = {
  transactions: [],
  currencyRates: [],
  selectedCurrency: 'USD'
};

export const financeReducer = createReducer(
  initialState,
  on(FinanceActions.addTransaction, (state, { transaction }) => ({
    ...state,
    transactions: [...state.transactions, transaction]
  })),
  on(FinanceActions.deleteTransaction, (state, { id }) => ({
    ...state,
    transactions: state.transactions.filter(t => t.id !== id)
  })),
  on(FinanceActions.updateTransaction, (state, { transaction }) => ({
    ...state,
    transactions: state.transactions.map(t => 
      t.id === transaction.id ? transaction : t
    )
  })),
  on(FinanceActions.loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions
  })),
  on(FinanceActions.updateCurrencyRates, (state, { rates }) => ({
    ...state,
    currencyRates: rates
  }))
);
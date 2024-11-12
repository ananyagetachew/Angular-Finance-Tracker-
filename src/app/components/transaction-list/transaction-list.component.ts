import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import * as FinanceActions from '../../store/finance.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="p-4">
      <h2 class="text-2xl mb-4">Transactions</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="px-4 py-2">Type</th>
              <th class="px-4 py-2">Amount</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Category</th>
              <th class="px-4 py-2">Date</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (transaction of transactions$ | async; track transaction.id) {
              <tr>
                <td class="border px-4 py-2">{{ transaction.type }}</td>
                <td class="border px-4 py-2">{{ transaction.amount }}</td>
                <td class="border px-4 py-2">{{ transaction.description }}</td>
                <td class="border px-4 py-2">{{ transaction.category }}</td>
                <td class="border px-4 py-2">{{ transaction.date }}</td>
                <td class="border px-4 py-2">
                  <button (click)="deleteTransaction(transaction.id!)" 
                          class="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class TransactionListComponent implements OnInit {
  transactions$: Observable<Transaction[]>;

  constructor(private store: Store<{ finance: { transactions: Transaction[] } }>) {
    this.transactions$ = store.select(state => state.finance.transactions);
  }

  ngOnInit() {
    this.store.dispatch(FinanceActions.loadTransactions());
  }

  deleteTransaction(id: number) {
    this.store.dispatch(FinanceActions.deleteTransaction({ id }));
  }
}
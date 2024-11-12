import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Transaction, CurrencyRate } from '../../models/transaction.model';
import { AsyncPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-balance-display',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe],
  template: `
    <div class="p-4 bg-white rounded-lg shadow">
      <h2 class="text-2xl mb-4">Balance Summary</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-gray-100 rounded">
          <h3 class="text-lg mb-2">USD Balance</h3>
          <p class="text-2xl font-bold" [class.text-green-500]="(balance$ | async)! > 0"
             [class.text-red-500]="(balance$ | async)! < 0">
            $ {{ balance$ | async | number:'1.2-2' }}
          </p>
        </div>

        @for (rate of currencyRates$ | async; track rate.code) {
          <div class="p-4 bg-gray-100 rounded">
            <h3 class="text-lg mb-2">{{ rate.code }} Balance</h3>
            <p class="text-2xl font-bold">
              {{ (balance$ | async)! * rate.rate | number:'1.2-2' }} {{ rate.code }}
            </p>
          </div>
        }
      </div>
    </div>
  `
})
export class BalanceDisplayComponent {
  balance$: Observable<number>;
  currencyRates$: Observable<CurrencyRate[]>;

  constructor(private store: Store<{
    finance: {
      transactions: Transaction[];
      currencyRates: CurrencyRate[];
    }
  }>) {
    this.balance$ = store.select('finance').pipe(
      map(state => state.transactions.reduce((acc, curr) => 
        curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0
      ))
    );

    this.currencyRates$ = store.select(state => state.finance.currencyRates);
  }
}
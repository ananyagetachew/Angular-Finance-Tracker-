import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { TransactionFormComponent } from './app/components/transaction-form/transaction-form.component';
import { TransactionListComponent } from './app/components/transaction-list/transaction-list.component';
import { BalanceDisplayComponent } from './app/components/balance-display/balance-display.component';
import { financeReducer } from './app/store/finance.reducer';
import { FinanceEffects } from './app/store/finance.effects';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TransactionFormComponent,
    TransactionListComponent,
    BalanceDisplayComponent
  ],
  template: `
    <div class="min-h-screen bg-gray-100 p-4">
      <h1 class="text-3xl font-bold mb-8 text-center">Finance Tracker</h1>
      
      <div class="max-w-6xl mx-auto">
        <app-balance-display class="mb-8 block" />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg shadow">
            <h2 class="text-xl font-semibold p-4 border-b">Add Transaction</h2>
            <app-transaction-form />
          </div>
          
          <div class="bg-white rounded-lg shadow">
            <app-transaction-list />
          </div>
        </div>
      </div>
    </div>
  `
})
export class App {
  name = 'Finance Tracker';
}

bootstrapApplication(App, {
  providers: [
    provideStore({ finance: financeReducer }),
    provideEffects([FinanceEffects]),
    provideStoreDevtools(),
    provideHttpClient()
  ]
});
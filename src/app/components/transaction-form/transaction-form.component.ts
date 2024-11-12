import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model';
import * as FinanceActions from '../../store/finance.actions';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="transactionForm" (ngSubmit)="onSubmit()" class="p-4">
      <div class="mb-4">
        <label class="block mb-2">Type</label>
        <select formControlName="type" class="w-full p-2 border rounded">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block mb-2">Amount</label>
        <input type="number" formControlName="amount" class="w-full p-2 border rounded">
      </div>

      <div class="mb-4">
        <label class="block mb-2">Description</label>
        <input type="text" formControlName="description" class="w-full p-2 border rounded">
      </div>

      <div class="mb-4">
        <label class="block mb-2">Category</label>
        <input type="text" formControlName="category" class="w-full p-2 border rounded">
      </div>

      <div class="mb-4">
        <label class="block mb-2">Date</label>
        <input type="date" formControlName="date" class="w-full p-2 border rounded">
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Add Transaction
      </button>
    </form>
  `
})
export class TransactionFormComponent {
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.transactionForm = this.fb.group({
      type: ['income', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transaction: Transaction = this.transactionForm.value;
      this.store.dispatch(FinanceActions.addTransaction({ transaction }));
      this.transactionForm.reset();
    }
  }
}
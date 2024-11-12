import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '../services/api.service';
import * as FinanceActions from './finance.actions';

@Injectable()
export class FinanceEffects {
  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.loadTransactions),
      mergeMap(() =>
        this.apiService.getTransactions().pipe(
          map(transactions => FinanceActions.loadTransactionsSuccess({ transactions })),
          catchError(() => of({ type: '[Finance] Load Transactions Error' }))
        )
      )
    )
  );

  addTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.addTransaction),
      mergeMap(action =>
        this.apiService.addTransaction(action.transaction).pipe(
          map(transaction => ({ type: '[Finance] Add Transaction Success', transaction })),
          catchError(() => of({ type: '[Finance] Add Transaction Error' }))
        )
      )
    )
  );

  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.deleteTransaction),
      mergeMap(action =>
        this.apiService.deleteTransaction(action.id).pipe(
          map(() => ({ type: '[Finance] Delete Transaction Success', id: action.id })),
          catchError(() => of({ type: '[Finance] Delete Transaction Error' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}
}
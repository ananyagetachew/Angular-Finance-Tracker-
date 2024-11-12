import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CurrencyRate } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly API_KEY = 'demo-key'; // Replace with your actual API key
  private readonly API_URL = 'https://api.freecurrencyapi.com/v1/latest';

  constructor(private http: HttpClient) {}

  getCurrencyRates(): Observable<CurrencyRate[]> {
    // For demo purposes, return mock data
    return of([
      { code: 'EUR', rate: 0.85 },
      { code: 'GBP', rate: 0.73 },
      { code: 'JPY', rate: 110.25 }
    ]);
  }
}
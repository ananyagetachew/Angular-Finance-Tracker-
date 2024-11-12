export interface Transaction {
  id?: number;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface Balance {
  total: number;
  currency: string;
}

export interface CurrencyRate {
  code: string;
  rate: number;
}
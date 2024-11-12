import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import Database from 'better-sqlite3';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: any;

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    this.db = new Database('finance.db');
    
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        amount REAL NOT NULL,
        description TEXT,
        category TEXT,
        date TEXT NOT NULL
      )
    `);
  }

  getAllTransactions(): Observable<Transaction[]> {
    const stmt = this.db.prepare('SELECT * FROM transactions ORDER BY date DESC');
    return from([stmt.all()]);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    const stmt = this.db.prepare(`
      INSERT INTO transactions (type, amount, description, category, date)
      VALUES (@type, @amount, @description, @category, @date)
    `);
    
    const result = stmt.run(transaction);
    return from([{ ...transaction, id: result.lastInsertRowid }]);
  }

  deleteTransaction(id: number): Observable<void> {
    const stmt = this.db.prepare('DELETE FROM transactions WHERE id = ?');
    return from([stmt.run(id)]);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    const stmt = this.db.prepare(`
      UPDATE transactions 
      SET type = @type, amount = @amount, description = @description,
          category = @category, date = @date
      WHERE id = @id
    `);
    
    stmt.run(transaction);
    return from([transaction]);
  }
}
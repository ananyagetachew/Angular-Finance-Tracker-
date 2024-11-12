class Transaction {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.amount = data.amount;
    this.description = data.description;
    this.category = data.category;
    this.date = data.date;
  }

  validate() {
    if (!this.type || !['income', 'expense'].includes(this.type)) {
      throw new Error('Invalid transaction type');
    }
    if (!this.amount || isNaN(this.amount) || this.amount <= 0) {
      throw new Error('Invalid amount');
    }
    if (!this.description) {
      throw new Error('Description is required');
    }
    if (!this.category) {
      throw new Error('Category is required');
    }
    if (!this.date) {
      throw new Error('Date is required');
    }
    return true;
  }
}

module.exports = Transaction;
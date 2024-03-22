export interface ExpenseI {
  id: number;
  merchant: string;
  amount: number;
  description: string;
  date: string; // if you want to enforce date format, consider using Date type or a library like moment.js
  category: string;
  status: string; // replace with actual status values
}

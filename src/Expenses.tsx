import React, { useEffect, useState } from "react";
import { ExpenseI } from "./interfaces/expense.interface";
// import { formatter } from "./utils/formatter";

const Expenses = () => {
  const [expenses, setExpenses] = useState<ExpenseI[] | null>(null);

  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  useEffect(() => {
    getExpenses();
  }, []);

  const getExpenses = () => {
    const api = "https://expenses-backend-mu.vercel.app/expenses";
    try {
      fetch(api, {
        headers: {
          "Content-Type": "application/json",
          Username: "asad.javed",
        },
      })
        .then((response) => response.json())
        .then((data) => setExpenses(data));
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  const convertDatetoString = (dateS: string): string => {
    const date = new Date(dateS);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();

    return `${month} ${day}`;
  };

  return (
    <table id='expenses-table' className='table'>
      <thead>
        <tr>
          <th>Merchant</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
          <th>Category</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {expenses &&
          expenses.map((expense: ExpenseI) => (
            <tr key={expense.id}>
              <td>{expense.merchant}</td>
              <td>{formatter.format(expense.amount)}</td>
              <td>{expense.description}</td>
              <td>{convertDatetoString(expense.date)}</td>
              <td>{expense.category}</td>
              <td>{expense.status}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Expenses;

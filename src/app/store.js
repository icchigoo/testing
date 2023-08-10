import { configureStore } from "@reduxjs/toolkit";

import transactionReducer from "../features/transaction/transactionSlice";
import expensesReducer from "../features/expenses/expensesSlice";
import incomesReducer from "../features/incomes/incomesSlice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    expenses: expensesReducer,
    incomes: incomesReducer,
  },
});

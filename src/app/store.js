import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import uploadReducer from "../features/upload/uploadSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import expensesReducer from "../features/expenses/expensesSlice";
import incomesReducer from "../features/incomes/incomesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    upload: uploadReducer,
    transaction: transactionReducer,
    expenses: expensesReducer,
    incomes: incomesReducer,
  },
});


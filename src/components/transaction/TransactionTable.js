import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactionsForProperty } from "../../features/transaction/transactionSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const TransactionTable = ({ propertyId }) => {
  const dispatch = useDispatch();

  // Fetch transactions for the property when the component mounts
  useEffect(() => {
    console.log("Fetching transactions for property:", propertyId);
    dispatch(fetchTransactionsForProperty(propertyId));
  }, [dispatch, propertyId]);

  // Get the transactions from the Redux store
  const transactions = useSelector((state) => state.transaction.transactionsForProperty);

  // Display loading message while fetching data
  if (!transactions) {
    return <Typography variant="subtitle1">Loading...</Typography>;
  }

  // Display message when no transactions are found
  if (transactions.length === 0) {
    return <Typography variant="subtitle1">No transactions found.</Typography>;
  }

  // Render the table with API data
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((property) =>
            property.transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.comment}</TableCell>
                <TableCell>{transaction.type}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;

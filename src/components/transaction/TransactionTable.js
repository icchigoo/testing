import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactionsForProperty, updateExistingTransaction } from "../../features/transaction/transactionSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";


const TransactionTable = ({ propertyId }) => {
  const dispatch = useDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState(null);
  const [editedTransactionData, setEditedTransactionData] = useState({
    date: "",
    amount: 0,
    comment: "",
    type: "",
  });

  useEffect(() => {
    dispatch(fetchTransactionsForProperty(propertyId));
  }, [dispatch, propertyId]);

  const transactions = useSelector((state) => state.transaction.transactionsForProperty);

  const handleEditClick = () => {
    // Open the edit dialog
    setIsEditDialogOpen(true);
  };
  const handleEditSubmit = async () => {
    try {
      await dispatch(updateExistingTransaction({
        propertyId, // Use the correct property ID
        updatedPropertyData: editedTransactionData,
      }));

      setIsEditDialogOpen(false);
      setEditedTransactionData({
        date: "",
        amount: 0,
        comment: "",
        type: "",
      });
    } catch (error) {
      console.error("Error updating property:", error);
      // Handle error
    }
  };
  
  
  if (!transactions) {
    return <Typography variant="subtitle1">Loading...</Typography>;
  }

  if (transactions.length === 0) {
    return <Typography variant="subtitle1">No transactions found.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Edit</TableCell>
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
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(transaction)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Dialog
        open={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditedTransaction(null);
          setEditedTransactionData({
            date: "",
            amount: 0,
            comment: "",
            type: "",
          });
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Amount"
              variant="outlined"
              fullWidth
              name="amount"
              value={editedTransactionData.amount}
              onChange={(event) =>
                setEditedTransactionData((prevData) => ({
                  ...prevData,
                  amount: event.target.value,
                }))
              }
            />
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              fullWidth
              name="date"
              value={editedTransactionData.date}
              onChange={(event) =>
                setEditedTransactionData((prevData) => ({
                  ...prevData,
                  date: event.target.value,
                }))
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Comment"
              variant="outlined"
              fullWidth
              name="comment"
              value={editedTransactionData.comment}
              onChange={(event) =>
                setEditedTransactionData((prevData) => ({
                  ...prevData,
                  comment: event.target.value,
                }))
              }
            />
            <Select
              value={editedTransactionData.type}
              onChange={(event) =>
                setEditedTransactionData((prevData) => ({
                  ...prevData,
                  type: event.target.value,
                }))
              }
              variant="outlined"
              fullWidth
              name="type"
            >
              <MenuItem value="">Select type</MenuItem>
              <MenuItem value="rental">Rental</MenuItem>
              <MenuItem value="capital">Capital</MenuItem>
              {/* ... (other menu items) */}
            </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsEditDialogOpen(false);
              setEditedTransaction(null);
              setEditedTransactionData({
                date: "",
                amount: 0,
                comment: "",
                type: "",
              });
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default TransactionTable;

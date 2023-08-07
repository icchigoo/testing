import React, { useState } from "react";
import { createTransaction } from "../features/transaction/transactionService";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Card,
} from "@mui/material";
import { Add, Cancel } from "@mui/icons-material";
import TransactionTable from "../components/transaction/TransactionTable";

const AddTransaction = ({ propertyId }) => {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [newTransactions, setNewTransactions] = useState([
    {
      date: "",
      amount: 0,
      comment: "",
      type: "",
    },
  ]);

  const handleAddTransaction = () => {
    setNewTransactions((prevTransactions) => [
      ...prevTransactions,
      {
        date: "",
        amount: 0,
        comment: "",
        type: "",
      },
    ]);
  };

  const handleRemoveTransaction = (index) => {
    setNewTransactions((prevTransactions) =>
      prevTransactions.filter((_, i) => i !== index)
    );
  };

  const handleTransactionInputChange = (event, index) => {
    const { name, value } = event.target;

    setNewTransactions((prevTransactions) =>
      prevTransactions.map((transaction, i) =>
        i === index ? { ...transaction, [name]: value } : transaction
      )
    );
  };

  const handleTransactionFormSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const createdTransaction = await createTransaction(propertyId, {
        transactions: newTransactions,
      });
      console.log("Transactions created:", createdTransaction);

      // Reset transaction form and close it
      setNewTransactions([
        {
          date: "",
          amount: 0,
          comment: "",
          type: "",
        },
      ]);
      setIsTransactionFormOpen(false);

      // Handle the created transactions, e.g., display a success message or perform any additional actions
    } catch (error) {
      console.error("Error creating transactions:", error);
      // Handle the error, e.g., display an error message
    }
  };

  return (
    <Grid container spacing={2} className="mb-4 px-6">
      <Grid item xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" gutterBottom>
             Transaction
          </Typography>
          <IconButton
            color="primary"
            onClick={() => setIsTransactionFormOpen(true)}
          >
            <Add />
          </IconButton>
        </Stack>
        <Card>
          <Dialog
            open={isTransactionFormOpen}
            onClose={() => setIsTransactionFormOpen(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Create Transaction</DialogTitle>
            <DialogContent>
              <form onSubmit={handleTransactionFormSubmit}>
                <Grid container spacing={2}>
                  {newTransactions.map((transaction, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12} md={12}>
                        <Typography variant="subtitle1" gutterBottom>
                          New Transaction {index + 1}
                        </Typography>
                        <TextField
                          label="Amount"
                          variant="outlined"
                          fullWidth
                          name="amount"
                          value={transaction.amount}
                          onChange={(event) =>
                            handleTransactionInputChange(event, index)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Date"
                          type="date"
                          variant="outlined"
                          fullWidth
                          name="date"
                          value={transaction.date}
                          onChange={(event) =>
                            handleTransactionInputChange(event, index)
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Comment"
                          variant="outlined"
                          fullWidth
                          name="comment"
                          value={transaction.comment}
                          onChange={(event) =>
                            handleTransactionInputChange(event, index)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Select
                          value={transaction.type}
                          onChange={(event) =>
                            handleTransactionInputChange(event, index)
                          }
                          variant="outlined"
                          fullWidth
                          name="type"
                        >
                          <MenuItem value="">Select type</MenuItem>
                          <MenuItem value="rental">Rental</MenuItem>
                          <MenuItem value="capital">Capital</MenuItem>
                          <MenuItem value="council">Council</MenuItem>
                          <MenuItem value="depreciationAndAmortisation">
                            Depreciation and Amortisation
                          </MenuItem>
                          <MenuItem value="insurance">Insurance</MenuItem>
                          <MenuItem value="maintenance">Maintenance</MenuItem>
                          <MenuItem value="managementFees">Management Fees</MenuItem>
                          <MenuItem value="otherExpenses">Other Expenses</MenuItem>
                          <MenuItem value="strataBodyCorporate">
                            Strata Body Corporate
                          </MenuItem>
                          <MenuItem value="waterRate">Water Rate</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <IconButton
                          color="primary"
                          onClick={handleAddTransaction}
                        >
                          <Add />
                        </IconButton>
                        {index !== 0 && (
                          <IconButton
                            color="secondary"
                            onClick={() => handleRemoveTransaction(index)}
                          >
                            <Cancel />
                          </IconButton>
                        )}
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
                <DialogActions>
                  <Button
                    onClick={() => setIsTransactionFormOpen(false)}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Done
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </Card>
        <Grid item xs={12}>
        <TransactionTable propertyId={propertyId} />
      </Grid>
      </Grid>
    </Grid>
  );
};

export default AddTransaction;

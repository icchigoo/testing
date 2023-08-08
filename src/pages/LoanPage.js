import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editProperty } from "../features/property/propertySlice";
import {
  Card,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import LoadingSpinner from "../components/spinner/LoadingSpinner";

const LoanPage = ({ property, onClose }) => {
  const dispatch = useDispatch();
  const [loanName, setLoanName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [loanInterestRate, setLoanInterestRate] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [showAddLoan, setShowAddLoan] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the loan being edited

  useEffect(() => {
    if (editIndex !== null && property && property.loan) {
      const loan = property.loan[editIndex];
      setLoanName(loan.name);
      setLoanAmount(loan.loanAmountRemaining);
      setLoanTerm(loan.longTermRemaining);
      setLoanInterestRate(loan.interestRate);
      setLoanDate(loan.date);
    }
  }, [editIndex, property]);

  const handleLoanNameChange = (e) => {
    setLoanName(e.target.value);
  };

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
  };

  const handleLoanTermChange = (e) => {
    setLoanTerm(e.target.value);
  };

  const handleLoanInterestRateChange = (e) => {
    setLoanInterestRate(e.target.value);
  };

  const handleLoanDateChange = (e) => {
    setLoanDate(e.target.value);
  };

  const handleSubmitLoan = (e) => {
    e.preventDefault();

    const newLoan = {
      name: loanName,
      loanAmountRemaining: loanAmount,
      longTermRemaining: loanTerm,
      interestRate: loanInterestRate,
      date: loanDate,
    };

    let updatedLoans = [...property.loan];

    if (editIndex !== null) {
      // Update existing loan
      updatedLoans[editIndex] = newLoan;
    } else {
      // Add new loan
      updatedLoans = [...property.loan, newLoan];
    }

    const updatedProperty = {
      ...property,
      loan: updatedLoans,
    };

    dispatch(editProperty({ id: property._id, updatedProperty }))
      .then(() => {
        setLoanName("");
        setLoanAmount("");
        setLoanTerm("");
        setLoanInterestRate("");
        setLoanDate("");
        setShowAddLoan(false);
        setEditIndex(null);
      })
      .catch((error) => {
        console.error("Error adding/editing loan:", error);
      });
  };

  const handleEditLoan = (loanIndex) => {
    setEditIndex(loanIndex);
    setShowAddLoan(true); // Show the edit section when editing a loan
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setLoanName("");
    setLoanAmount("");
    setLoanTerm("");
    setLoanInterestRate("");
    setLoanDate("");
    setShowAddLoan(false);
  };

  useEffect(() => {
    if (!showAddLoan) {
      setEditIndex(null);
      setLoanName("");
      setLoanAmount("");
      setLoanTerm("");
      setLoanInterestRate("");
      setLoanDate("");
    }
  }, [showAddLoan]);

  const handleLoanDelete = (loanIndex) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this loan?"
    );

    if (confirmDelete) {
      const updatedLoans = [...property.loan];
      updatedLoans.splice(loanIndex, 1);

      const updatedProperty = {
        ...property,
        loan: updatedLoans,
      };

      dispatch(editProperty({ id: property._id, updatedProperty }))
        .then(() => {
          // Deletion successful, do any additional actions here if needed
        })
        .catch((error) => {
          console.error("Error deleting loan:", error);
          // Handle the error, show an error message, or perform any recovery actions
        });
    }
  };

  if (!property) {
    return <LoadingSpinner />;
  }

  // Calculate total loan balance
  const totalLoanBalance = property.loan.reduce((acc, loan) => {
    return acc + parseFloat(loan.loanAmountRemaining);
  }, 0);

  return (
    <Grid>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" gutterBottom>
          Loan
        </Typography>
        <IconButton onClick={() => setShowAddLoan(true)} color="primary">
          <Add />
        </IconButton>
      </Stack>
      <Card>
        <Paper className="p-4">
          <Paper elevation={3} style={{ padding: "12px", textAlign: "right" }}>
            <Typography variant="body1" color="textSecondary">
              Total Loan Balance: ${totalLoanBalance.toFixed(2)}
            </Typography>
          </Paper>

          {property.loan.length === 0 ? (
            <p>No loans added yet.</p>
          ) : (
            <TableContainer component={Paper} className="mt-2">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Term</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {property.loan.map((loan, index) => (
                    <TableRow key={index}>
                      <TableCell>{loan.name}</TableCell>
                      <TableCell>
                        ${parseFloat(loan.loanAmountRemaining).toFixed(2)}
                      </TableCell>
                      <TableCell>{loan.longTermRemaining}</TableCell>
                      <TableCell>{loan.interestRate}%</TableCell>
                      <TableCell>{loan.date}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleLoanDelete(index)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEditLoan(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
        <Dialog
          open={showAddLoan}
          onClose={() => setShowAddLoan(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {editIndex !== null ? "Edit Loan" : "Add Loan"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Loan Name"
                  value={loanName}
                  onChange={handleLoanNameChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Loan Amount"
                  type="number"
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Loan Term"
                  type="number"
                  value={loanTerm}
                  onChange={handleLoanTermChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Interest Rate"
                  type="number"
                  value={loanInterestRate}
                  onChange={handleLoanInterestRateChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Loan Date"
                  type="date"
                  name="loan date"
                  value={loanDate}
                  onChange={handleLoanDateChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelEdit} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmitLoan} color="primary">
              {editIndex !== null ? "Update Loan" : "Add Loan"}
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
};

export default LoanPage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";


import { getPropertyById, editProperty } from "../features/property/propertySlice";

const LoanPage = ({ propertyId, onClose }) => {
  const dispatch = useDispatch();
  const property = useSelector((state) =>
    state.property.properties.find((p) => p._id === propertyId)
  );
  const [loanName, setLoanName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [loanInterestRate, setLoanInterestRate] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [showAddLoan, setShowAddLoan] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the loan being edited

  useEffect(() => {
    const fetchPropertyLoans = async () => {
      try {
        await dispatch(getPropertyById(propertyId));
      } catch (error) {
        console.error("Error fetching property loans:", error);
      }
    };

    fetchPropertyLoans();
  }, [dispatch, propertyId]);

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

    dispatch(editProperty({ id: propertyId, updatedProperty }))
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
  };

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

      dispatch(editProperty({ id: propertyId, updatedProperty }))
        .then(() => {})
        .catch((error) => {
          console.error("Error deleting loan:", error);
        });
    }
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  // Calculate total loan balance
  const totalLoanBalance = property.loan.reduce((acc, loan) => {
    return acc + parseFloat(loan.loanAmountRemaining);
  }, 0);

  return (
    <Card>
      <Paper elevation={3} className="p-4">
        <Typography variant="h5" gutterBottom>
          Loan Details
        </Typography>
        <Typography variant="subtitle1">
          Total Loan Balance: ${totalLoanBalance.toFixed(2)}
        </Typography>
        {property.loan.length === 0 ? (
          <Typography variant="body1">No loans added yet.</Typography>
        ) : (
          <TableContainer component={Paper} className="mt-2">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Loan Name</TableCell>
                  <TableCell>Loan Amount</TableCell>
                  <TableCell>Loan Term</TableCell>
                  <TableCell>Interest Rate</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {property.loan.map((loan, index) => (
                  <TableRow key={index}>
                    <TableCell>{loan.name}</TableCell>
                    <TableCell>${parseFloat(loan.loanAmountRemaining).toFixed(2)}</TableCell>
                    <TableCell>{loan.longTermRemaining}</TableCell>
                    <TableCell>{loan.interestRate}%</TableCell>
                    <TableCell>{loan.date}</TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <>
                          <Button
                            onClick={() => handleCancelEdit()}
                            className="text-gray-500 hover:text-gray-700 mr-2"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleLoanDelete(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => handleEditLoan(index)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <div className="flex justify-end mt-4">
          <Button
            onClick={() => setShowAddLoan(true)}
            variant="contained"
            color="primary"
          >
            Add Loan
          </Button>
        </div>
      </Paper>

      {showAddLoan && (
        <Paper elevation={3} className="mt-4 p-4">
          <Typography variant="h6" gutterBottom>
            Add Loan
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Loan Name"
                value={loanName}
                onChange={handleLoanNameChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Loan Amount"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Loan Term"
                value={loanTerm}
                onChange={handleLoanTermChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Interest Rate"
                value={loanInterestRate}
                onChange={handleLoanInterestRateChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Loan Date"
                type="date"
                value={loanDate}
                onChange={handleLoanDateChange}
                required
              />
            </Grid>
          </Grid>
          <div className="flex justify-end mt-2">
            {editIndex !== null ? (
              <>
                <Button
                  className="mr-2"
                  onClick={() => handleCancelEdit()}
                  variant="outlined"
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmitLoan} variant="contained" color="primary">
                  Update Loan
                </Button>
              </>
            ) : (
              <Button onClick={handleSubmitLoan} variant="contained" color="primary">
                Add Loan
              </Button>
            )}
          </div>
        </Paper>
      )}
     </Card>
  );
};

export default LoanPage;
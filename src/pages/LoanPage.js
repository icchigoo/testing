import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPropertyById,
  editProperty,
} from "../features/property/propertySlice";
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
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import Iconify from "../components/iconify/Iconify";

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
    setShowAddLoan(false);
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
      <Container>
        <Paper className="p-4">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Details
            </Typography>
            <Button onClick={() => setShowAddLoan(true)} color="primary">
              <Iconify icon="bi:plus-circle" />{" "}
            </Button>
          </Stack>
          <Typography variant="h6" className="text-right font-bold">
            Total Loan Balance: ${totalLoanBalance.toFixed(2)}
          </Typography>
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
                        {editIndex === index ? (
                          <>
                            <IconButton
                              onClick={() => handleCancelEdit()}
                              className="text-gray-500 hover:text-gray-700 mr-2"
                            ></IconButton>
                            <IconButton
                              onClick={() => handleLoanDelete(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Edit />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            onClick={() => handleEditLoan(index)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit />
                          </IconButton>
                        )}
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
            <Button onClick={() => setShowAddLoan(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmitLoan} color="primary">
              {editIndex !== null ? "Update Loan" : "Add Loan"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Card>
  );
};

export default LoanPage;

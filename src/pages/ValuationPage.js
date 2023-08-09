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
  MenuItem
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import LoadingSpinner from "../components/spinner/LoadingSpinner";

const ValuationPage = ({ property, onClose }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [valuationType, setValuationType] = useState("");
  const [dateError, setDateError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [showAddValuation, setShowAddValuation] = useState(false);
  const [editingValuation, setEditingValuation] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (property && property.valuations) {
      const amounts = property.valuations.map((valuation) =>
        Number(valuation.amount)
      );
      const sum = amounts.reduce((acc, val) => acc + val, 0);
      setTotalAmount(sum);
    }
  }, [property]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setDateError("");
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleValuationTypeChange = (e) => {
    setValuationType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const purchaseDate = new Date(property.dateofPurchase);
    const selectedDate = new Date(date);

    if (selectedDate > currentDate || selectedDate < purchaseDate) {
      setDateError(
        "Invalid date. Please select a date between the date of purchase and today."
      );
      return;
    }

    const valuationData = {
      date: date,
      amount: amount,
      type: valuationType,
    };

    if (editingValuation) {
      // Editing an existing valuation
      const updatedValuations = property.valuations.map((valuation) => {
        if (valuation._id === editingValuation._id) {
          return {
            ...valuation,
            date: date,
            amount: amount,
            type: valuationType,
          };
        }
        return valuation;
      });

      const updatedProperty = {
        ...property,
        valuations: updatedValuations,
      };

      dispatch(editProperty({ id: property._id, updatedProperty }))
        .then(() => {
          setDate("");
          setAmount("");
          setValuationType("");
          setEditingValuation(null);
          setShowAddValuation(false);
        })
        .catch((error) => {
          console.error("Error updating valuation:", error);
        });
    } else {
      // Adding a new valuation
      const updatedProperty = {
        ...property,
        valuations: [...property.valuations, valuationData],
      };

      dispatch(editProperty({ id: property._id, updatedProperty }))
        .then(() => {
          setDate("");
          setAmount("");
          setValuationType("");
          setShowAddValuation(false);
        })
        .catch((error) => {
          console.error("Error adding valuation:", error);
        });
    }
  };

  const handleValuationDelete = (valuationId) => {
    const updatedValuations = property.valuations.filter(
      (valuation) => valuation._id !== valuationId
    );

    const updatedProperty = {
      ...property,
      valuations: updatedValuations,
    };

    dispatch(editProperty({ id: property._id, updatedProperty }))
      .then(() => {})
      .catch((error) => {
        console.error("Error deleting valuation:", error);
      });
  };

  const handleValuationEdit = (valuationId) => {
    const valuationToEdit = property.valuations.find(
      (valuation) => valuation._id === valuationId
    );

    setDate(valuationToEdit.date);
    setAmount(valuationToEdit.amount);
    setValuationType(valuationToEdit.type);
    setEditingValuation(valuationToEdit);
    setIsEditMode(true);
    setShowAddValuation(true);
  };

  const handleCancel = () => {
    setDate("");
    setAmount("");
    setValuationType("");
    setEditingValuation(null);
    setIsEditMode(false);
    setShowAddValuation(false);
  };

  if (!property) {
    return <LoadingSpinner />;
  }
  return (
    <Grid>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" gutterBottom>
          Valuations
        </Typography>
        <IconButton onClick={() => setShowAddValuation(true)} color="primary">
          <Add />
        </IconButton>
      </Stack>
      <Card>
        <Paper className="p-4">
          <Paper elevation={3} style={{ padding: "12px", textAlign: "right" }}>
            <Typography variant="body1" color="textSecondary">
              Total Valuation Amount: ${totalAmount.toFixed(2)}
            </Typography>
          </Paper>
          {property.valuations.length === 0 ? (
            <p>No valuations added yet.</p>
          ) : (
            <TableContainer component={Paper} className="mt-2">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {property.valuations.map((valuation, index) => (
                    <TableRow key={valuation._id}>
                      <TableCell>{valuation.date}</TableCell>
                      <TableCell>
                        ${parseFloat(valuation.amount).toFixed(2)}
                      </TableCell>
                      <TableCell>{valuation.type}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleValuationEdit(valuation._id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleValuationDelete(valuation._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Delete />
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
          open={showAddValuation}
          onClose={handleCancel}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {isEditMode ? "Edit Valuation" : "Add Valuation"}
          </DialogTitle>
          <Grid>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Date"
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    variant="outlined"
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {dateError && (
                    <Typography variant="caption" color="error">
                      {dateError}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Valuation Type"
                    select
                    value={valuationType}
                    onChange={handleValuationTypeChange}
                    variant="outlined"
                    fullWidth
                    required
                  >
                    <MenuItem value="formal">Formal</MenuItem>
                    <MenuItem value="informal">Informal</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <Button onClick={handleCancel} color="secondary" fullWidth>
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button onClick={handleSubmit} color="primary" fullWidth variant="contained">
                    {editingValuation ? "Update Valuation" : "Add Valuation"}
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Grid>
        </Dialog>
      </Card>
    </Grid>
  );
};

export default ValuationPage;

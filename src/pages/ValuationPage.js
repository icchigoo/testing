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
  MenuItem
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Iconify from "../components/iconify/Iconify";

const ValuationPage = ({ propertyId, onClose }) => {
  const dispatch = useDispatch();
  const property = useSelector((state) =>
    state.property.properties.find((p) => p._id === propertyId)
  );
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [valuationType, setValuationType] = useState("");
  const [dateError, setDateError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [showAddValuation, setShowAddValuation] = useState(false);
  const [editingValuationId, setEditingValuationId] = useState(null);

  useEffect(() => {
    const fetchPropertyValuations = async () => {
      try {
        await dispatch(getPropertyById(propertyId));
      } catch (error) {
        console.error("Error fetching property valuations:", error);
      }
    };

    fetchPropertyValuations();
  }, [dispatch, propertyId]);

  useEffect(() => {
    if (property && property.valuations) {
      const amounts = property.valuations.map(
        (valuation) => Number(valuation.amount)
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

    if (editingValuationId) {
      // Editing an existing valuation
      const updatedValuations = property.valuations.map((valuation) => {
        if (valuation._id === editingValuationId) {
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

      dispatch(editProperty({ id: propertyId, updatedProperty }))
        .then(() => {
          setDate("");
          setAmount("");
          setValuationType("");
          setEditingValuationId(null);
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

      dispatch(editProperty({ id: propertyId, updatedProperty }))
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

    dispatch(editProperty({ id: propertyId, updatedProperty }))
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
    setEditingValuationId(valuationId);
    setShowAddValuation(true);
  };

  const handleCancel = () => {
    setDate("");
    setAmount("");
    setValuationType("");
    setEditingValuationId(null);
    setShowAddValuation(false);
  };

  if (!property) {
    return <div>Loading...</div>;
  }
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
              Valuations
            </Typography>
            <Button onClick={() => setShowAddValuation(true)} color="primary">
              <Iconify icon="bi:plus-circle" />{" "}
            </Button>
          </Stack>
          {/* <Typography variant="h6" className="text-right font-bold">
            Total Valuation Amount: ${totalValuationAmount.toFixed(2)}
          </Typography> */}
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
                        {editingValuationId === valuation._id ? (
                          <>
                            <IconButton
                              onClick={() => handleCancel()}
                              className="text-gray-500 hover:text-gray-700 mr-2"
                            >
                              <Delete />
                            </IconButton>
                            <IconButton
                              onClick={() => handleValuationDelete(valuation._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Edit />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            onClick={() => handleValuationEdit(valuation._id)}
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
          open={showAddValuation}
          onClose={() => setShowAddValuation(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {editingValuationId ? "Edit Valuation" : "Add Valuation"}
          </DialogTitle>
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
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddValuation(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {editingValuationId ? "Update Valuation" : "Add Valuation"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Card>
  );
};

export default ValuationPage;
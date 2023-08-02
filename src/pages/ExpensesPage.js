import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHouseHoldExpenses,
  saveHouseHoldExpenses,
} from "../features/expenses/expensesSlice";
import { DEFAULT_HOUSE_HOLD_EXPENSES } from "../assets/incomeAndExpenses";
import { AiFillCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import {
  Typography,
  Container,
  Button,
  TextField,
  Grid,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  Stack,
  ButtonGroup,
  IconButton,
  MenuItem,
} from "@mui/material";

import Iconify from "../components/iconify";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CircularProgress } from "@mui/material";

const ExpensesPage = () => {
  const dispatch = useDispatch();
  const [isAddSingleExpenseOpen, setIsAddSingleExpenseOpen] = useState(false);
  const [singleExpenseCategory, setSingleExpenseCategory] = useState("");
  const [singleExpenseLabel, setSingleExpenseLabel] = useState("");
  const [singleExpenseFrequency, setSingleExpenseFrequency] =
    useState("weekly");
  const [formData, setFormData] = useState(DEFAULT_HOUSE_HOLD_EXPENSES);
  const [displayFrequency, setDisplayFrequency] = useState(1);
  const [overallFrequency, setOverallFrequency] = useState("weekly");
  const [isLoading, setIsLoading] = useState(true);
  const fetchedExpenses = useSelector((state) => state.expenses.expenses);
  const [showAlert, setShowAlert] = useState(false);

  const fetchExpenses = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      await dispatch(getHouseHoldExpenses());
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching household expenses:", error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (fetchedExpenses) {
      // Filter out unwanted properties
      const { _id, __v, user, ...filteredExpenses } = fetchedExpenses;

      setFormData(filteredExpenses);
    }
  }, [fetchedExpenses]);

  const handleAddSingleExpense = () => {
    setIsAddSingleExpenseOpen(true);
  };

  const handleCancelAddExpense = () => {
    setIsAddSingleExpenseOpen(false);
    setSingleExpenseCategory("");
    setSingleExpenseLabel("");
    setSingleExpenseFrequency("weekly");

    setShowAlert(false);
  };

  const handleSingleExpenseSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      category: singleExpenseCategory,
      label: singleExpenseLabel,
      frequency: singleExpenseFrequency,
      value: 0,
      key: Math.random(),
    };

    setFormData((prevData) => ({
      ...prevData,
      [singleExpenseCategory]: [...prevData[singleExpenseCategory], newExpense],
    }));

    setIsAddSingleExpenseOpen(false);
    setSingleExpenseCategory("");
    setSingleExpenseLabel("");
    setSingleExpenseFrequency("weekly");
  };

  const handleExpenseAdded = () => {
    setShowAlert(true);

    // Hide the alert after 2 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleRemoveExpense = (category, index) => {
    setFormData((prevData) => {
      const updatedExpenses = [...prevData[category]];
      updatedExpenses.splice(index, 1);

      return {
        ...prevData,
        [category]: updatedExpenses,
      };
    });
  };

  const handleAllExpensesSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      overallFrequency: overallFrequency,
    };

    setIsLoading(true); // Set loading to true before saving data

    try {
      await dispatch(saveHouseHoldExpenses(updatedFormData));
      setIsLoading(false); // Set loading to false after data is saved
    } catch (error) {
      console.error("Error saving household expenses:", error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  const calculateTotal = () => {
    let total = 0;

    Object.values(formData).forEach((expenses) => {
      expenses.forEach((expense) => {
        const adjustedAmount = calculateAdjustedAmount(
          expense.value,
          expense.frequency,
          overallFrequency
        );
        total += adjustedAmount * displayFrequency;
      });
    });

    return total;
  };

  const calculateAdjustedAmount = (amount, frequency, overallFrequency) => {
    const weeklyAmount = amount;

    switch (frequency) {
      case "weekly":
        switch (overallFrequency) {
          case "weekly":
            return weeklyAmount;
          case "monthly":
            return weeklyAmount * 4;
          case "fortnightly":
            return weeklyAmount * 2;
          case "yearly":
            return weeklyAmount * 52;
          default:
            return weeklyAmount;
        }
      case "monthly":
        switch (overallFrequency) {
          case "weekly":
            return weeklyAmount / 4;
          case "monthly":
            return weeklyAmount;
          case "fortnightly":
            return weeklyAmount / 2;
          case "yearly":
            return weeklyAmount * 12;
          default:
            return weeklyAmount;
        }
      case "fortnightly":
        switch (overallFrequency) {
          case "weekly":
            return weeklyAmount / 2;
          case "monthly":
            return weeklyAmount * 2;
          case "fortnightly":
            return weeklyAmount;
          case "yearly":
            return weeklyAmount * 26;
          default:
            return weeklyAmount;
        }
      case "yearly":
        switch (overallFrequency) {
          case "weekly":
            return weeklyAmount / 52;
          case "monthly":
            return weeklyAmount / 12;
          case "fortnightly":
            return weeklyAmount / 26;
          case "yearly":
            return weeklyAmount;
          default:
            return weeklyAmount;
        }
      default:
        return weeklyAmount;
    }
  };

  const renderExpenses = (expenseCategory) => {
    const currentExpenses = formData[expenseCategory];

    if (!Array.isArray(currentExpenses) || currentExpenses.length === 0) {
      return (
        <tr>
          <td colSpan="5">No expenses available for this category.</td>
        </tr>
      );
    }

    return currentExpenses.map((expense, index) => {
      const adjustedAmount = calculateAdjustedAmount(
        expense.value,
        expense.frequency,
        overallFrequency
      );
      const total = adjustedAmount * displayFrequency;

      const handleValueChange = (e) => {
        const newValue = parseFloat(e.target.value);
        const updatedExpenses = currentExpenses.map((item, i) => {
          if (i === index) {
            return { ...item, value: newValue };
          }
          return item;
        });
        setFormData((prevData) => ({
          ...prevData,
          [expenseCategory]: updatedExpenses,
        }));
      };

      const handleFrequencyChange = (e) => {
        const newFrequency = e.target.value;
        const updatedExpenses = currentExpenses.map((item, i) => {
          if (i === index) {
            return { ...item, frequency: newFrequency };
          }
          return item;
        });
        setFormData((prevData) => ({
          ...prevData,
          [expenseCategory]: updatedExpenses,
        }));
      };

      return (
        <TableRow key={expense.key}>
          <TableCell sx={{ width: "30%" }}>{expense.label}</TableCell>
          <TableCell sx={{ width: "20%" }}>
            <Select
              value={expense.frequency}
              onChange={handleFrequencyChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="fortnightly">Fortnightly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </TableCell>
          <TableCell>
            <TextField
              type="number"
              value={expense.value}
              onChange={handleValueChange}
              variant="outlined"
              fullWidth
            />
          </TableCell>
          <TableCell sx={{ width: "15%" }}>
            ${Math.round(total * 100) / 100}
          </TableCell>
          <TableCell>
            <IconButton size="small" onClick={() =>handleRemoveExpense(expenseCategory, index)}>
              <Iconify icon={"ant-design:delete-filled"} />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Household Expenses
        </Typography>
        {!isAddSingleExpenseOpen ? (
          <Button variant="contained" onClick={handleAddSingleExpense}>
            Add
          </Button>
        ) : (
          <Dialog
            open={isAddSingleExpenseOpen}
            onClose={handleCancelAddExpense}
          >
            <DialogTitle>Add New Income</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSingleExpenseSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Category"
                      variant="outlined"
                      value={singleExpenseCategory}
                      onChange={(e) => setSingleExpenseCategory(e.target.value)}
                      select
                      fullWidth
                      required
                    >
                      <MenuItem value="">Select Category</MenuItem>
                      <MenuItem value="livingExpenses">
                        Living Expenses
                      </MenuItem>
                      <MenuItem value="entertainmentExpenses">
                        Entertainment Expenses
                      </MenuItem>
                      <MenuItem value="transportExpenses">
                        Transport Expenses
                      </MenuItem>
                      <MenuItem value="houseExpenses">House Expenses</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Label"
                      variant="outlined"
                      value={singleExpenseLabel}
                      onChange={(e) => setSingleExpenseLabel(e.target.value)}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={handleCancelAddExpense}
                      sx={{
                        bgcolor: "red",
                        color: "white",
                        "&:hover": {
                          bgcolor: "#ff0000",
                        },
                      }}
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </Stack>

      {/* Loading indicator */}
      {/* {isLoading && <div>Loading...</div>} */}

      {showAlert && (
        <Typography sx={{ color: "green" }}>Successfully added!</Typography>
      )}

      <ButtonGroup variant="contained" color="primary" aria-label="Frequency">
        <Button
          onClick={() => setOverallFrequency("weekly")}
          sx={{
            bgcolor:
              overallFrequency === "weekly" ? "primary.main" : "transparent",
            color: overallFrequency === "weekly" ? "white" : "primary.main",
          }}
        >
          Weekly
        </Button>
        <Button
          onClick={() => setOverallFrequency("fortnightly")}
          sx={{
            bgcolor:
              overallFrequency === "fortnightly"
                ? "primary.main"
                : "transparent",
            color:
              overallFrequency === "fortnightly" ? "white" : "primary.main",
          }}
        >
          Fortnightly
        </Button>
        <Button
          onClick={() => setOverallFrequency("monthly")}
          sx={{
            bgcolor:
              overallFrequency === "monthly" ? "primary.main" : "transparent",
            color: overallFrequency === "monthly" ? "white" : "primary.main",
          }}
        >
          Monthly
        </Button>
        <Button
          onClick={() => setOverallFrequency("yearly")}
          sx={{
            bgcolor:
              overallFrequency === "yearly" ? "primary.main" : "transparent",
            color: overallFrequency === "yearly" ? "white" : "primary.main",
          }}
        >
          Yearly
        </Button>
      </ButtonGroup>

      <form onSubmit={handleAllExpensesSubmit}>
        {Object.entries(formData).map(([category, expenses]) => (
          <div key={category} sx={{ mt: 8 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              {category}
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 600 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Frequency</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderExpenses(category)}</TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item>
            <Typography variant="subtitle1">
              Total: ${Math.round(calculateTotal() * 100) / 100}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ExpensesPage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHouseHoldIncomes,
  saveHouseHoldIncomes,
} from "../features/incomes/incomesSlice";
import { DEFAULT_INCOMES } from "../assets/incomeAndExpenses";
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

const IncomePage = () => {
  const dispatch = useDispatch();
  const [isAddSingleIncomeOpen, setIsAddSingleIncomeOpen] = useState(false);
  const [singleIncomeLabel, setSingleIncomeLabel] = useState("");
  const [singleIncomeFrequency, setSingleIncomeFrequency] = useState("weekly");
  const [formData, setFormData] = useState({ incomes: DEFAULT_INCOMES });

  const [displayFrequency, setDisplayFrequency] = useState(1);
  const [overallFrequency, setOverallFrequency] = useState("weekly");
  const [isLoading, setIsLoading] = useState(true);
  const fetchedIncomes = useSelector((state) => state.incomes.incomes);
  const [showAlert, setShowAlert] = useState(false);

  const fetchIncomes = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      await dispatch(getHouseHoldIncomes());
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching household incomes:", error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  useEffect(() => {
    if (fetchedIncomes) {
      // Filter out unwanted properties
      const { _id, __v, user, ...filteredIncomes } = fetchedIncomes;

      setFormData(filteredIncomes);
    }
  }, [fetchedIncomes]);

  const handleAddSingleIncome = () => {
    setIsAddSingleIncomeOpen(true);
  };

  const handleCancelAddIncome = () => {
    setIsAddSingleIncomeOpen(false);
    setSingleIncomeLabel("");
    setSingleIncomeFrequency("weekly");

    setShowAlert(false); // Set showAlert to false when canceling
  };

  const handleSingleIncomeSubmit = (e) => {
    e.preventDefault();

    const newIncome = {
      label: singleIncomeLabel,
      frequency: singleIncomeFrequency,
      value: 0,
      key: Math.random(),
    };

    setFormData((prevData) => ({
      ...prevData,
      incomes: [...prevData.incomes, newIncome],
    }));

    setIsAddSingleIncomeOpen(false);
    setSingleIncomeLabel("");
    setSingleIncomeFrequency("weekly");
  };

  const handleIncomeAdded = () => {
    setShowAlert(true);

    // Hide the alert after 2 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleRemoveIncome = (index) => {
    setFormData((prevData) => {
      const updatedIncomes = [...prevData.incomes];
      updatedIncomes.splice(index, 1);

      return {
        ...prevData,
        incomes: updatedIncomes,
      };
    });
  };

  const handleAllIncomesSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      incomes: formData.incomes,
      overallFrequency: overallFrequency,
    };

    setIsLoading(true); // Set loading to true before saving data

    try {
      await dispatch(saveHouseHoldIncomes(updatedFormData));
      setIsLoading(false); // Set loading to false after data is saved
    } catch (error) {
      console.error("Error saving household incomes:", error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  const calculateTotalIncome = () => {
    let total = 0;

    // Access the `incomes` array within the `formData` object
    const incomes = formData.incomes;

    if (!Array.isArray(incomes) || incomes.length === 0) {
      return total;
    }

    incomes.forEach((income) => {
      const adjustedAmount = calculateAdjustedIncomeAmount(
        income.value,
        income.frequency,
        overallFrequency
      );
      total += adjustedAmount * displayFrequency;
    });

    return total;
  };

  const calculateAdjustedIncomeAmount = (
    amount,
    frequency,
    overallFrequency
  ) => {
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

  const renderIncomes = () => {
    const currentIncomes = formData.incomes;

    if (!Array.isArray(currentIncomes) || currentIncomes.length === 0) {
      return (
        <tr>
          <td colSpan="5">No incomes available.</td>
        </tr>
      );
    }

    return currentIncomes.map((income, index) => {
      const adjustedAmount = calculateAdjustedIncomeAmount(
        income.value,
        income.frequency,
        overallFrequency
      );
      const total = adjustedAmount * displayFrequency;

      const handleValueChange = (e) => {
        const newValue = parseFloat(e.target.value);
        const updatedIncomes = currentIncomes.map((item, i) => {
          if (i === index) {
            return { ...item, value: newValue };
          }
          return item;
        });
        setFormData((prevData) => ({
          ...prevData,
          incomes: updatedIncomes,
        }));
      };

      const handleFrequencyChange = (e) => {
        const newFrequency = e.target.value;
        const updatedIncomes = currentIncomes.map((item, i) => {
          if (i === index) {
            return { ...item, frequency: newFrequency };
          }
          return item;
        });
        setFormData((prevData) => ({
          ...prevData,
          incomes: updatedIncomes,
        }));
      };

      return (
        <TableRow key={income.key}>
         <TableCell sx={{ width: "30%" }}>{income.label}</TableCell>
         <TableCell sx={{ width: "20%" }}>
            <Select
              value={income.frequency}
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
          <TableCell >
            <TextField
              type="number"
              value={income.value}
              onChange={handleValueChange}
              variant="outlined"
              fullWidth
            />
          </TableCell>
          <TableCell sx={{ width: "15%" }}>${Math.round(total * 100) / 100}</TableCell>
          <TableCell>
            <IconButton size="small" onClick={() => handleRemoveIncome(index)}>
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
          Household Incomes
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAddSingleIncome}
        >
          Add
        </Button>
      </Stack>

      {/* {isLoading && <CircularProgress />} */}

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

      <form onSubmit={handleAllIncomesSubmit}>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table style={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderIncomes()}</TableBody>
          </Table>
        </TableContainer>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item>
            <Typography variant="subtitle1">
              Total: ${Math.round(calculateTotalIncome() * 100) / 100}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog open={isAddSingleIncomeOpen} onClose={handleCancelAddIncome}>
        <DialogTitle>Add New Income</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSingleIncomeSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  label="Label"
                  variant="outlined"
                  value={singleIncomeLabel}
                  onChange={(e) => setSingleIncomeLabel(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>

              <Grid item>
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleCancelAddIncome}
                  sx={{
                    bgcolor: "red",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#ff0000", // Red color for hover state
                    },
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default IncomePage;

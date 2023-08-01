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
  MenuItem,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  RadioGroup,
  Radio,
  FormControlLabel,
  ButtonGroup,
} from "@mui/material";

import { BsTrash } from "react-icons/bs";
import Iconify from "../components/iconify";

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

    handleIncomeAdded();
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
        <tr key={income.key}>
          <td className="border px-4 py-2">
            <BsTrash
              onClick={() => handleRemoveIncome(index)}
              className="text-red-500 cursor-pointer"
            />
          </td>
          <td className="border px-4 py-2">
            <span>{income.label}</span>
          </td>
          <td className="border px-4 py-2">
            <select
              value={income.frequency}
              onChange={handleFrequencyChange}
              className="w-full p-2 border rounded"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="yearly">Yearly</option>
            </select>
          </td>
          <td className="border px-4 py-2">
            <input
              type="number"
              value={income.value}
              onChange={handleValueChange}
              className="w-full p-2 border rounded"
            />
          </td>
          <td className="border px-4 py-2">${Math.round(total * 100) / 100}</td>
        </tr>
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

      {isLoading && <Typography>Loading...</Typography>}

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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Label</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Total</TableCell>
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

      {isAddSingleIncomeOpen && (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          <Grid item>
            <Paper elevation={3} sx={{ p: 2 }}>
                  <form onSubmit={handleSingleIncomeSubmit}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <TextField
                      label="Label"
                      variant="outlined"
                      value={singleIncomeLabel}
                      onChange={(e) => setSingleIncomeLabel(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <Select
                      value={singleIncomeFrequency}
                      onChange={(e) => setSingleIncomeFrequency(e.target.value)}
                      variant="outlined"
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="fortnightly">Fortnightly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={handleCancelAddIncome}
                      sx={{ bgcolor: "red", color: "white" }}
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
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default IncomePage;

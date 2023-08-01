import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHouseHoldExpenses,
  saveHouseHoldExpenses,
} from "../features/expenses/expensesSlice";
import { DEFAULT_HOUSE_HOLD_EXPENSES } from "../assets/incomeAndExpenses";
import { AiFillCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

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

    handleExpenseAdded();
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
        <tr key={expense.key}>
          <td className="border px-4 py-2">
            <BsTrash
              onClick={() => handleRemoveExpense(expenseCategory, index)}
              className="text-red-500 cursor-pointer"
            />
          </td>
          <td className="border px-4 py-2">
            <span>{expense.label}</span>
          </td>
          <td className="border px-4 py-2">
            <select
              value={expense.frequency}
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
              value={expense.value}
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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Household Expenses</h2>
        {!isAddSingleExpenseOpen ? (
          <button
            onClick={handleAddSingleExpense}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            <AiFillCheckCircle className="mr-2" />
            Add Expense
          </button>
        ) : (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2">Add Expense</h3>
              <form onSubmit={handleSingleExpenseSubmit}>
                <div className="mb-2">
                  <label
                    htmlFor="single-category"
                    className="block font-semibold mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="single-category"
                    name="category"
                    value={singleExpenseCategory}
                    onChange={(e) => setSingleExpenseCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="livingExpenses">Living Expenses</option>
                    <option value="entertainmentExpenses">
                      Entertainment Expenses
                    </option>
                    <option value="transportExpenses">
                      Transport Expenses
                    </option>
                    <option value="houseExpenses">House Expenses</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="single-label"
                    className="block font-semibold mb-1"
                  >
                    Label
                  </label>
                  <input
                    type="text"
                    id="single-label"
                    name="label"
                    value={singleExpenseLabel}
                    onChange={(e) => setSingleExpenseLabel(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleCancelAddExpense}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ml-0"
                  >
                    <AiOutlineCloseCircle className="mr-10" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  >
                    <AiFillCheckCircle className="mr-1" />
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {isLoading && <div>Loading...</div>}

      {showAlert && (
        <div className="fixed inset-x-0 bottom-0 flex justify-center items-center">
          <div className="bg-green-500 text-white py-2 px-4 rounded">
            Successfully added!
          </div>
        </div>
      )}

      <div className="mt-4">
        <div className="flex space-x-4">
          <button
            className={`${
              overallFrequency === "weekly"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } py-2 px-4 rounded hover:bg-blue-600`}
            onClick={() => setOverallFrequency("weekly")}
          >
            Weekly
          </button>
          <button
            className={`${
              overallFrequency === "fortnightly"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } py-2 px-4 rounded hover:bg-blue-600`}
            onClick={() => setOverallFrequency("fortnightly")}
          >
            Fortnightly
          </button>
          <button
            className={`${
              overallFrequency === "monthly"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } py-2 px-4 rounded hover:bg-blue-600`}
            onClick={() => setOverallFrequency("monthly")}
          >
            Monthly
          </button>
          <button
            className={`${
              overallFrequency === "yearly"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } py-2 px-4 rounded hover:bg-blue-600`}
            onClick={() => setOverallFrequency("yearly")}
          >
            Yearly
          </button>
        </div>
      </div>

      <form onSubmit={handleAllExpensesSubmit}>
        {Object.entries(formData).map(([category, expenses]) => (
          <div key={category} className="mt-8">
            <h3 className="text-lg font-semibold mb-2">{category}</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 w-1/6"></th>
                    <th className="border px-4 py-2 w-1/3">Label</th>
                    <th className="border px-4 py-2 w-1/6">Frequency</th>
                    <th className="border px-4 py-2 w-1/6">Value</th>
                    <th className="border px-4 py-2 w-1/6">Total</th>
                  </tr>
                </thead>
                <tbody>{renderExpenses(category)}</tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="mt-8 flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">Total Expenses</h3>
            <p className="font-semibold">
              Total: ${Math.round(calculateTotal() * 100) / 100}
            </p>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Save All Expenses
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpensesPage;

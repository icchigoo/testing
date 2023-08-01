import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHouseHoldIncomes,
  saveHouseHoldIncomes,
} from "../features/incomes/incomesSlice";
import { DEFAULT_INCOMES } from "../assets/incomeAndExpenses";
import { AiFillCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Household Incomes</h2>
        {!isAddSingleIncomeOpen ? (
          <button
            onClick={handleAddSingleIncome}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            <AiFillCheckCircle className="mr-2" />
            Add Income
          </button>
        ) : (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2">Add Income</h3>
              <form onSubmit={handleSingleIncomeSubmit}>
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
                    value={singleIncomeLabel}
                    onChange={(e) => setSingleIncomeLabel(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleCancelAddIncome}
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

      <form onSubmit={handleAllIncomesSubmit}>
        <div key="incomes" className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Incomes</h3>
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
              <tbody>{renderIncomes()}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">Total Incomes</h3>
            <p className="font-semibold">
              Total: ${Math.round(calculateTotalIncome() * 100) / 100}
            </p>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Save All Incomes
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomePage;

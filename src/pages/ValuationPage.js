import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPropertyById,
  editProperty,
} from "../features/property/propertySlice";

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
    <div className="p-4">
      <div className="bg-white rounded-md shadow-md p-4">
        <h2 className="text-2xl font-bold mb-4">Current Valuation</h2>
        <div className="flex justify-end text-xl font-bold">
          ${totalAmount}
        </div>
      </div>

      <div className="bg-white rounded-md shadow-md mt-4 p-4">
        <h3 className="text-xl font-bold mb-2">Initial Valuation</h3>
        <p className="mb-4">
          Edit the initial valuation by updating the purchase price on the
          information tab.
        </p>
        <h3 className="text-xl font-bold mb-2">Valuations:</h3>
        {property.valuations.length === 0 ? (
          <p>No valuations added yet.</p>
        ) : (
          <table className="w-full border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Type</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {property.valuations.map((valuation, index) => (
                <tr key={valuation._id}>
                  <td className="py-2 px-4 border-b">{valuation.date}</td>
                  <td className="py-2 px-4 border-b">{valuation.amount}</td>
                  <td className="py-2 px-4 border-b">{valuation.type}</td>
                  {index !== property.valuations.length - 1 && (
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleValuationEdit(valuation._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>{" "}
                      |{" "}
                      <button
                        onClick={() => handleValuationDelete(valuation._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={() => setShowAddValuation(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Valuation
          </button>
        </div>
      </div>

      {showAddValuation && (
        <div className="bg-white rounded-md shadow-md mt-4 p-4">
          <h3 className="text-xl font-bold mb-2">
            {editingValuationId ? "Edit Valuation" : "Add Valuation"}
          </h3>
          <div className="flex mb-4">
            <div className="mr-4 w-1/3">
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              />
              {dateError && (
                <p className="text-red-500 text-sm">{dateError}</p>
              )}
            </div>
            <div className="mr-4 w-1/3">
              <label
                htmlFor="amount"
                className="block text-sm font-medium mb-2"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleAmountChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <div className="w-1/3">
              <label
                htmlFor="valuationType"
                className="block text-sm font-medium mb-2"
              >
                Valuation Type
              </label>
              <select
                id="valuationType"
                value={valuationType}
                onChange={handleValuationTypeChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              >
                <option value="">Select Type</option>
                <option value="formal">Formal</option>
                <option value="informal">Informal</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleSubmit}
            >
              {editingValuationId ? "Update Valuation" : "Add Valuation"}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValuationPage;

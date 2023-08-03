import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


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
    <div className="p-4">
      <div className="bg-white rounded-md shadow-md p-4">
        <h2 className="text-2xl font-bold mb-4">Loan Details</h2>
        <div className="flex justify-end text-xl font-bold">
          Total Loan Balance: ${totalLoanBalance.toFixed(2)}
        </div>
        {property.loan.length === 0 ? (
          <p>No loans added yet.</p>
        ) : (
          <table className="w-full border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Loan Name</th>
                <th className="py-2 px-4 border-b">Loan Amount</th>
                <th className="py-2 px-4 border-b">Loan Term</th>
                <th className="py-2 px-4 border-b">Interest Rate</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {property.loan.map((loan, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{loan.name}</td>
                  <td className="py-2 px-4 border-b">
                    ${parseFloat(loan.loanAmountRemaining).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {loan.longTermRemaining}
                  </td>
                  <td className="py-2 px-4 border-b">{loan.interestRate}%</td>
                  <td className="py-2 px-4 border-b">{loan.date}</td>
                  <td className="py-2 px-4 border-b">
                    {editIndex === index ? (
                      <>
                        <button
                          onClick={() => handleCancelEdit()}
                          className="text-gray-500 hover:text-gray-700 mr-2"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleLoanDelete(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEditLoan(index)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={() => setShowAddLoan(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Loan
          </button>
        </div>
      </div>

      {showAddLoan && (
        <div className="bg-white rounded-md shadow-md mt-4 p-4">
          <h3 className="text-xl font-bold mb-2">Add Loan</h3>
          <div className="flex mb-4">
            <div className="mr-4 w-1/4">
              <label
                htmlFor="loanName"
                className="block text-sm font-medium mb-2"
              >
                Loan Name
              </label>
              <input
                type="text"
                id="loanName"
                value={loanName}
                onChange={handleLoanNameChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mr-4 w-1/4">
              <label
                htmlFor="loanAmount"
                className="block text-sm font-medium mb-2"
              >
                Loan Amount
              </label>
              <input
                type="number"
                id="loanAmount"
                value={loanAmount}
                onChange={handleLoanAmountChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mr-4 w-1/4">
              <label
                htmlFor="loanTerm"
                className="block text-sm font-medium mb-2"
              >
                Loan Term
              </label>
              <input
                type="number"
                id="loanTerm"
                value={loanTerm}
                onChange={handleLoanTermChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mr-4 w-1/4">
              <label
                htmlFor="loanInterestRate"
                className="block text-sm font-medium mb-2"
              >
                Interest Rate
              </label>
              <input
                type="number"
                id="loanInterestRate"
                value={loanInterestRate}
                onChange={handleLoanInterestRateChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mr-4 w-1/4">
              <label
                htmlFor="loanDate"
                className="block text-sm font-medium mb-2"
              >
                Loan Date
              </label>
              <input
                type="date"
                id="loanDate"
                value={loanDate}
                onChange={handleLoanDateChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            {editIndex !== null ? (
              <>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                  onClick={() => handleCancelEdit()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={handleSubmitLoan}
                >
                  Update Loan
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleSubmitLoan}
              >
                Add Loan
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanPage;

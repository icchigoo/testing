import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProperty } from "../features/property/propertySlice";

const EditPropertyPage = ({ property, propertyId, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(property.name);
  const [address, setAddress] = useState(property.address);
  const [dateofPurchase, setDateofPurchase] = useState(property.dateofPurchase);
  const [state, setState] = useState(property.state);
  const [income, setIncome] = useState(property.income);
  const [purchaseRate, setPurchaseRate] = useState(property.purchaseRate);
  const [rentalIncome, setRentalIncome] = useState(property.rentalIncome);
  const [strataBodyCorporate, setStrataBodyCorporate] = useState(
    property.strataBodyCorporate
  );
  const [councilRates, setCouncilRates] = useState(property.councilRates);
  const [waterRates, setWaterRates] = useState(property.waterRates);
  const [insurancePremium, setInsurancePremium] = useState(
    property.insurancePremium
  );
  const [managementFee, setManagementFee] = useState(property.managementFee);
  const [maintenance, setMaintenance] = useState(property.maintenance);

    // New fields
    const [beds, setBeds] = useState(property.beds);
    const [baths, setBaths] = useState(property.baths);
    const [parking, setParking] = useState(property.parking);
    const [sqft, setSqft] = useState(property.sqft);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleDateofPurchaseChange = (e) => {
    setDateofPurchase(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const handlePurchasePriceChange = (e) => {
    setPurchaseRate(e.target.value);
  };

  const handleRentalIncomeChange = (e) => {
    setRentalIncome(e.target.value);
  };

  const handleStrataBodyCorporateChange = (e) => {
    setStrataBodyCorporate(e.target.value);
  };

  const handleCouncilRatesChange = (e) => {
    setCouncilRates(e.target.value);
  };

  const handleWaterRatesChange = (e) => {
    setWaterRates(e.target.value);
  };

  const handleInsurancePremiumChange = (e) => {
    setInsurancePremium(e.target.value);
  };

  const handleManagementFeeChange = (e) => {
    setManagementFee(e.target.value);
  };

  const handleMaintenanceChange = (e) => {
    setMaintenance(e.target.value);
  };
  const handleBedsChange = (e) => {
    setBeds(e.target.value);
  };

  const handleBathsChange = (e) => {
    setBaths(e.target.value);
  };

  const handleParkingChange = (e) => {
    setParking(e.target.value);
  };

  const handleSqftChange = (e) => {
    setSqft(e.target.value);
  };

  const handleDone = () => {
    const updatedProperty = {
      ...property,
      name,
      address,
      dateofPurchase,
      state,
      income,
      purchaseRate,
      rentalIncome,
      strataBodyCorporate,
      councilRates,
      waterRates,
      insurancePremium,
      managementFee,
      maintenance,
      beds,
      baths,
      parking,
      sqft,
    };
    dispatch(editProperty({ id: propertyId, updatedProperty }))
      .unwrap()
      .then(() => {
        // Property updated successfully, perform any necessary actions
        onClose();
      })
      .catch((error) => {
        console.error("Error updating property:", error);
      });
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-auto">
      <div className="bg-white rounded-lg p-8 w-full max-w-7xl">
        <h2 className="text-2xl font-bold mb-6">Edit Property</h2>

        {/* Property Details */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-auto">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="address" className="block font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={handleAddressChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="dateofPurchase"
                className="block font-medium mb-2"
              >
                Date of Purchase
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="dateofPurchase"
                  value={dateofPurchase}
                  onChange={handleDateofPurchaseChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full pr-10"
                />
                <svg
                  className="absolute top-3 right-3 h-5 w-5 text-gray-400 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-1a7 7 0 100-14 7 7 0 000 14zm-2-7a1 1 0 112 0v3a1 1 0 11-2 0v-3zm2-1a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div>
              <label htmlFor="state" className="block font-medium mb-2">
                State
              </label>
              <input
                type="text"
                id="state"
                value={state}
                onChange={handleStateChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="income" className="block font-medium mb-2">
                Income
              </label>
              <input
                type="number"
                id="income"
                value={income}
                onChange={handleIncomeChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
          </div>
        </div>

        {/* Purchase Costs */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Purchase Costs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-auto">
            <div>
              <label htmlFor="purchasePrice" className="block font-medium mb-2">
                Purchase Price
              </label>
              <input
                type="number"
                id="purchaseRate"
                value={purchaseRate}
                onChange={handlePurchasePriceChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="rentalIncome" className="block font-medium mb-2">
                Rental Income
              </label>
              <input
                type="number"
                id="rentalIncome"
                value={rentalIncome}
                onChange={handleRentalIncomeChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
          </div>
        </div>

        {/* Expenses */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Expenses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-auto">
            <div>
              <label
                htmlFor="strataBodyCorporate"
                className="block font-medium mb-2"
              >
                Strata/Body Corporate (quarterly)
              </label>
              <input
                type="number"
                id="strataBodyCorporate"
                value={strataBodyCorporate}
                onChange={handleStrataBodyCorporateChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="councilRates" className="block font-medium mb-2">
                Council Rates (yearly)
              </label>
              <input
                type="number"
                id="councilRates"
                value={councilRates}
                onChange={handleCouncilRatesChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="waterRates" className="block font-medium mb-2">
                Water Rates (yearly)
              </label>
              <input
                type="number"
                id="waterRates"
                value={waterRates}
                onChange={handleWaterRatesChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="insurancePremium"
                className="block font-medium mb-2"
              >
                Insurance Premium (yearly)
              </label>
              <input
                type="number"
                id="insurancePremium"
                value={insurancePremium}
                onChange={handleInsurancePremiumChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="managementFee" className="block font-medium mb-2">
                Management Fee (% of rent)
              </label>
              <input
                type="number"
                id="managementFee"
                value={managementFee}
                onChange={handleManagementFeeChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="maintenance" className="block font-medium mb-2">
                Maintenance (% of rent)
              </label>
              <input
                type="number"
                id="maintenance"
                value={maintenance}
                onChange={handleMaintenanceChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="beds" className="block font-medium mb-2">
                Beds
              </label>
              <input
                type="number"
                id="beds"
                value={beds}
                onChange={handleBedsChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="baths" className="block font-medium mb-2">
                Baths
              </label>
              <input
                type="number"
                id="baths"
                value={baths}
                onChange={handleBathsChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            
          </div>
          <div>
              <label htmlFor="parking" className="block font-medium mb-2">
                Parking
              </label>
              <input
                type="number"
                id="parking"
                value={parking}
                onChange={handleParkingChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="sqft" className="block font-medium mb-2">
                Sqft
              </label>
              <input
                type="number"
                id="sqft"
                value={sqft}
                onChange={handleSqftChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleDone}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Done
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 ml-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyPage;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editProperty } from "../features/property/propertySlice";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  InputAdornment,
  Alert,
} from "@mui/material";


const EditPropertyPage = ({ property, propertyId, onCancel }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(property.name);
  const [address, setAddress] = useState(property.address);
  const [dateofPurchase, setDateofPurchase] = useState(
    property.dateofPurchase.substring(0, 10) // Extract only the date part
  );

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
  const [beds, setBeds] = useState(property.beds);
  const [baths, setBaths] = useState(property.baths);
  const [parking, setParking] = useState(property.parking);
  const [sqft, setSqft] = useState(property.sqft);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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

        setShowSuccessAlert(true); // Set the state to true to show the alert
      })
      .catch((error) => {
        console.error("Error updating property:", error);
      });
  };

  const handleCancel = () => {
    onCancel(); // Call the onCancel prop function to exit the edit mode
  };

  


  return (
    <Container>
      {/* Property Details */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Property Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Date of Purchase"
              type="date"
              value={dateofPurchase}
              onChange={(e) => setDateofPurchase(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              variant="outlined"
            />
          </Grid>
          {/* <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid> */}
        </Grid>
      </Box>

      {/* Purchase Costs */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Purchase Costs
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Purchase Price"
              type="number"
              value={purchaseRate}
              onChange={(e) => setPurchaseRate(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Rental Income (weekly)"
              type="number"
              value={rentalIncome}
              onChange={(e) => setRentalIncome(e.target.value)}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">weekly</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Expenses */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Expenses
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Strata/Body Corporate (quarterly)"
              type="number"
              value={strataBodyCorporate}
              onChange={(e) => setStrataBodyCorporate(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Council Rates (yearly)"
              type="number"
              value={councilRates}
              onChange={(e) => setCouncilRates(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Water Rates (yearly)"
              type="number"
              value={waterRates}
              onChange={(e) => setWaterRates(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Insurance Premium (yearly)"
              type="number"
              value={insurancePremium}
              onChange={(e) => setInsurancePremium(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Management Fee (% of rent)"
              type="number"
              value={managementFee}
              onChange={(e) => setManagementFee(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Maintenance (% of rent)"
              type="number"
              value={maintenance}
              onChange={(e) => setMaintenance(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Beds"
              type="number"
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Baths"
              type="number"
              value={baths}
              onChange={(e) => setBaths(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Parking"
              type="number"
              value={parking}
              onChange={(e) => setParking(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Sqft"
              type="number"
              value={sqft}
              onChange={(e) => setSqft(e.target.value)}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>

      {showSuccessAlert && (
        <Alert
          severity="success"
          onClose={() => setShowSuccessAlert(false)}
          sx={{ my: 2 }} // Add some margin to separate from other elements
        >
          Property successfully edited!
        </Alert>
      )}

      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCancel}
          disableElevation
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDone}
          disableElevation
          sx={{ marginLeft: 2 }} 
        >
          Done
        </Button>
      </Box>
    </Container>
  );
};

export default EditPropertyPage;

import React, { useEffect, useState } from "react";
import propertyService from "../features/property/propertyService";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

const OverviewPage = ({ propertyId, onClose }) => {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await propertyService.getPropertyById(propertyId);
        setProperty(response);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (!property) {
    return <LoadingSpinner />;
  }

  const formatCurrency = (value) => {
    return value?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <Container>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <HomeIcon color="primary" />
          <Typography variant="h6">Property</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* Property Name */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Property Name: {property.name}
              </Typography>
            </Grid>
            {/* Property Address */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Property Address: {property.address}
              </Typography>
            </Grid>
            {/* Date of Purchase */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Date of Purchase: {property.dateofPurchase}
              </Typography>
            </Grid>
            {/* Suburb */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Suburb: {property.suburb}
              </Typography>
            </Grid>
            {/* Post Code */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Post Code: {property.postCode}
              </Typography>
            </Grid>
            {/* State */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                State: {property.state}
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Purchase Cost</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* Purchase Rate */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Purchase Rate: {formatCurrency(property.purchaseRate)}
              </Typography>
            </Grid>
            {/* Rental Income */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Rental Income (Weekly): {formatCurrency(property.rentalIncome)}
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Expenses</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* Strata Body Corporate (Quarterly) */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Strata Body Corporate (Quarterly):{" "}
                {formatCurrency(property.strataBodyCorporate)}
              </Typography>
            </Grid>
            {/* Council Rates (Yearly) */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Council Rates (Yearly): {formatCurrency(property.councilRates)}
              </Typography>
            </Grid>
            {/* Water Rates (Yearly) */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Water Rates (Yearly): {formatCurrency(property.waterRates)}
              </Typography>
            </Grid>
            {/* Insurance Premium (Yearly) */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Insurance Premium (Yearly):{" "}
                {formatCurrency(property.insurancePremium)}
              </Typography>
            </Grid>
            {/* Management Fee (% of Rent) */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Management Fee (% of Rent): {property.managementFee}%
              </Typography>
            </Grid>
            {/* Maintenance (% of Rent) */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1">
                Maintenance (% of Rent): {property.maintenance}%
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default OverviewPage;

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
          <Typography variant="h6">Property</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Property Name
              </Typography>
              <Typography variant="body1">{property.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Property Address
              </Typography>
              <Typography variant="body1">{property.address}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Date of Purchase
              </Typography>
              <Typography variant="body1">
                {property.dateofPurchase}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Suburb
              </Typography>
              <Typography variant="body1">{property.suburb}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Post Code
              </Typography>
              <Typography variant="body1">{property.postCode}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                State
              </Typography>
              <Typography variant="body1">{property.state}</Typography>
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
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Purchase Rate
              </Typography>
              <Typography variant="body1">
                {formatCurrency(property.purchaseRate)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Rental Income (Weekly)
              </Typography>
              <Typography variant="body1">
                {formatCurrency(property.rentalIncome)}
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
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Strata Body Corporate (Quarterly)
              </Typography>
              <Typography variant="body1">
                {formatCurrency(property.strataBodyCorporate)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Council Rates (Yearly)
              </Typography>
              <Typography variant="body1">
                {formatCurrency(property.councilRates)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Water Rates (Yearly)
              </Typography>
              <Typography variant="body1">
                {formatCurrency(property.waterRates)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Insurance Premium (Yearly)
              </Typography>
              <Typography variant="body1">
                {formatCurrency(property.insurancePremium)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Management Fee (% of Rent)
              </Typography>
              <Typography variant="body1">
                {property.managementFee}%
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Maintenance (% of Rent)
              </Typography>
              <Typography variant="body1">
                {property.maintenance}%
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default OverviewPage;

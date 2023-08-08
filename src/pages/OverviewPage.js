import React from "react";
import { Typography, AccordionDetails, Grid, Card } from "@mui/material";

const OverviewPage = ({ property, onClose }) => {
  const formatCurrency = (value) => {
    return value?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
          padding: "8px",
          marginBottom: "16px",
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
            color: "#333",
            marginRight: "16px",
          }}
        >
          Property Information
        </Typography>
        <div
          style={{
            flex: "1",
            height: "2px",
            backgroundColor: "#ccc",
          }}
        />
      </div>

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
            <Typography variant="body1">{property.dateofPurchase}</Typography>
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
          padding: "8px",
          marginBottom: "16px",
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
            color: "#333",
            marginRight: "16px",
          }}
        >
          Purchase Cost
        </Typography>
        <div
          style={{
            flex: "1",
            height: "2px",
            backgroundColor: "#ccc",
          }}
        />
      </div>

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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
          padding: "8px",
          marginBottom: "16px",
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
            color: "#333",
            marginRight: "16px",
          }}
        >
          Expenses Information
        </Typography>
        <div
          style={{
            flex: "1",
            height: "2px",
            backgroundColor: "#ccc",
          }}
        />
      </div>

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
            <Typography variant="body1">{property.managementFee}%</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Maintenance (% of Rent)
            </Typography>
            <Typography variant="body1">{property.maintenance}%</Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Card>
  );
};

export default OverviewPage;

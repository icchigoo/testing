import React from "react";
import { useParams } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import Typography from "@mui/material/Typography";
import PropertyMenuBar from "../components/menu-property/PropertyMenuBar";
import Button from "@mui/material/Button";
import OverviewPage from "./OverviewPage"; 
import LoanPage from "./LoanPage";
import ValuationPage from "./ValuationPage"; 
import AddTransaction from "./Addtransaction";
import { useState } from "react";
import {
  Container,
  Stack,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import Iconify from "../components/iconify";
import EditPropertyPage from "./EditPropertyPage";
import { AppCurrentVisits } from "../sections/@dashboard/app";
import { useTheme } from "@mui/material/styles";

const CardDetails = () => {
  const { propertyId } = useParams(); 
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();
  const properties = usePropertyContext();
  const propertyDetails = properties.find(
    (property) => property._id === propertyId
  );

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
    setIsEditing(false);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
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
          Details
        </Typography>
        {isEditing ? (
          <Button component={Link} to="/dashboard/products" variant="contained">
            Property
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:edit-fill" />}
            onClick={handleEditButtonClick}
          >
            Edit
          </Button>
        )}
      </Stack>

      {isEditing ? (
        <EditPropertyPage
          property={propertyDetails}
          
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <PropertyMenuBar
                onTabChange={handleTabChange}
                selectedTab={selectedTab}
              />

              {propertyDetails && propertyDetails._id && (
                <>
                  {selectedTab === 0 && (
                    <OverviewPage property={propertyDetails} />
                  )}
                  {selectedTab === 2 && <LoanPage property={propertyDetails} />}
                  {selectedTab === 3 && (
                    <ValuationPage property={propertyDetails} />
                  )}
                  {selectedTab === 1 && (
                    <AddTransaction property={propertyDetails} />
                  )}
                </>
              )}
            </Grid>
            <Grid item xs={12} md={4} marginTop={10}>
            <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Additional Information
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                    varius nisl ut ex aliquam, vel volutpat sapien malesuada.
                  </Typography>
                </CardContent>
                <Grid>
                  <AppCurrentVisits
                    title="Current Visits"
                    chartData={[
                      { label: "America", value: 4344 },
                      { label: "Asia", value: 5435 },
                      { label: "Europe", value: 1443 },
                      { label: "Africa", value: 4443 },
                    ]}
                    chartColors={[
                      theme.palette.primary.main,
                      theme.palette.info.main,
                      theme.palette.warning.main,
                      theme.palette.error.main,
                    ]}
                  />
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default CardDetails;

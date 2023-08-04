import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Stack,
  Typography,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import propertyService from "../features/property/propertyService";
import OverviewPage from "./OverviewPage";
import Iconify from "../components/iconify";
import PropertyMenuBar from "../components/menu-property/PropertyMenuBar";
import { AppCurrentVisits } from "../sections/@dashboard/app";
import { useTheme } from "@mui/material/styles";
import LoanPage from "./LoanPage";
import ValuationPage from "./ValuationPage";
import AddTransaction from "./Addtransaction";
import EditPropertyPage from "./EditPropertyPage";

const CardDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const theme = useTheme();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await propertyService.getPropertyById(productId);
        if (response) {
          setProduct(response);
        } else {
         
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
    setIsEditing(false); // Exit the edit mode when switching tabs
  };

  const handleEditButtonClick = () => {
    setIsEditing(true); // Enter the edit mode when the Edit button is clicked
  };

  // Loading state
  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Details
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:edit-fill" />} onClick={handleEditButtonClick}>
          Edit
        </Button>
      </Stack>

      {/* Conditional rendering */}
      {isEditing ? (
        // Render EditPropertyPage when in edit mode
        <EditPropertyPage property={product} propertyId={productId} onCancel={() => setIsEditing(false)} />
      ) : (
        // Render property details when not in edit mode
        <>
          <Stack direction="row" spacing={2}>
            <Typography variant="subtitle1" color="primary">
              {product.address}, {product.state}
            </Typography>
          </Stack>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <PropertyMenuBar selectedTab={selectedTab} onTabChange={handleTabChange} />
              {selectedTab === 0 && <OverviewPage propertyId={productId} onClose={() => {}} />}
              {selectedTab === 1 && <AddTransaction propertyId={productId} onClose={() => {}} />}
              {selectedTab === 2 && <LoanPage propertyId={productId} onClose={() => {}} />}
              {selectedTab === 3 && <ValuationPage propertyId={productId} onClose={() => {}} />}
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

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
import LoanPage from "./LoanPage"; // Import the LoanPage component
import Iconify from "../components/iconify";
import PropertyMenuBar from "../components/menu-property/PropertyMenuBar";
import { AppCurrentVisits } from "../sections/@dashboard/app";
import { useTheme } from "@mui/material/styles";
import ValuationPage from "./ValuationPage";
import AddTransaction from "./Addtransaction";
import EditPropertyPage from "./EditPropertyPage";
import { Link } from "react-router-dom";

const CardDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await propertyService.getPropertyById(productId);
        if (response) {
          setProduct(response);
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
    setIsEditing(false);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

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
        {isEditing ? (
            <Button component={Link} to="/dashboard/products" variant="contained">
            Property
          </Button>
        ) : (
          <Button variant="contained" startIcon={<Iconify icon="eva:edit-fill" />} onClick={handleEditButtonClick}>
            Edit
          </Button>
        )}
      </Stack>
      {isEditing ? (
        <EditPropertyPage property={product} propertyId={productId} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <Stack direction="row" spacing={2}>
            <Typography variant="subtitle1" color="primary">
              {product.address}, {product.state}
            </Typography>
          </Stack>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <PropertyMenuBar selectedTab={selectedTab} onTabChange={handleTabChange} />
              {selectedTab === 0 && <OverviewPage property={product} onClose={() => {}} />}
              {selectedTab === 1 && <AddTransaction propertyId={productId} onClose={() => {}} />}
              {selectedTab === 2 && <LoanPage property={product} propertyId={productId} onClose={() => {}} />} {/* Pass the product data */}
              {selectedTab === 3 && <ValuationPage property={product} onClose={() => {}} />}
            </Grid>
            <Grid item xs={12} md={4} marginTop={10}>
              {/* The rest of your Card component */}
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default CardDetails;
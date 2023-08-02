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
import General from "../components/menu/General";

const CardDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await propertyService.getPropertyById(productId);
        if (response) {
          setProduct(response);
        } else {
          // Handle the case when response is null or empty
          // For example, display an error message or redirect to another page
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Details
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:edit-fill" />}
        >
          Edit
        </Button>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography variant="subtitle1">
          {product.address}, {product.state}
        </Typography>
        <Typography variant="subtitle2" color="primary">
          Purchase Rate ${product.purchaseRate}
        </Typography>
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <PropertyMenuBar
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />
          {selectedTab === 0 && (
            <OverviewPage propertyId={productId} onClose={() => {}} />
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
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CardDetails;

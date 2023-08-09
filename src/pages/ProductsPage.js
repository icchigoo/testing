import React from "react";
import { usePropertyContext } from "../context/PropertyContext";
import {
  Container,
  Typography,
  Card,
  Box,
  Stack,
  Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { Grid } from "@mui/material";

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const PropertyList = () => {
  const {properties} = usePropertyContext();
  const imageHeight = "250px"; // Adjust the image height as needed
  const selectedImageIndex = 0; // You can adjust this index as needed

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Property
        </Typography>
        <Button component={RouterLink} to="/dashboard/property" variant="contained">
          Add Property
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {properties.map((property, index) => (
          <Grid key={index} item xs={12} sm={6} md={6}>
            <RouterLink to={`/dashboard/card-details/${property._id}`} style={{ textDecoration: "none" }}>
              <Card>
                <Box sx={{ pt: imageHeight, position: "relative" }}>
                  <StyledProductImg alt={property.name} src={property.images[selectedImageIndex]?.url} />
                </Box>
                <Stack spacing={2} sx={{ p: 3 }}>
                  <Typography variant="subtitle2" noWrap>
                    {property.name || "No Name"}
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    {property.address || "No Address"}
                  </Typography>
                </Stack>
              </Card>
            </RouterLink>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PropertyList;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperty } from "../features/property/propertySlice";
import { Link } from "react-router-dom";

import {
  Container,
  Typography,
  Card,
  Box,
  Link as MuiLink,
  Stack,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Iconify from "../components/iconify/Iconify";

import { Grid } from "@mui/material";

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const PropertyList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getProperty())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching property data:", error);
      });
  }, [dispatch]);

  const propertyState = useSelector((state) => state.property.properties);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleCardClick = (propertyId, index) => {
    setSelectedImageIndex(index);
    // Handle other card click logic if needed
  };

  const imageHeight = "250px"; // Adjust the image height as needed

  return (
    <>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Property
          </Typography>
          <Button
          component={Link}
          to="/dashboard/property"
          variant="contained"
          startIcon={<Iconify icon="eva:edit-fill" />}
        >
          Add Property
        </Button>
        </Stack>

        <Grid container spacing={3}>
          {propertyState.map((property, index) => (
            <Grid key={index} item xs={12} sm={6} md={6}>
              <Card>
                <Box sx={{ pt: imageHeight, position: "relative" }}>
                  <StyledProductImg
                    alt={property.name}
                    src={property.images[selectedImageIndex]?.url}
                  />
                </Box>

                <Stack spacing={2} sx={{ p: 3 }}>
                  <MuiLink
                    component={Link}
                    to={`/admin/card-details/${property._id}`}
                    color="inherit"
                    underline="hover"
                  >
                    <Typography variant="subtitle2" noWrap>
                      {property.name || "No Name"}
                    </Typography>
                  </MuiLink>

                  <Typography variant="subtitle1" noWrap>
                    {property.address || "No Address"}
                  </Typography>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default PropertyList;

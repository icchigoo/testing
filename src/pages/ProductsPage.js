import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperty } from "../features/property/propertySlice";
import { Link } from "react-router-dom";

import { Helmet } from 'react-helmet-async';
import { Container, Typography, Card, Box, Link as MuiLink, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Grid } from '@mui/material';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
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
      <Helmet>
        <title>Property List | Your Website Name</title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Property List
        </Typography>

        <Grid container spacing={3}>
          {propertyState.map((property, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Card>
                <Box sx={{ pt: imageHeight, position: 'relative' }}>
                  <StyledProductImg alt={property.name} src={property.images[selectedImageIndex]?.url} />
                </Box>

                <Stack spacing={2} sx={{ p: 3 }}>
                  <MuiLink component={Link} to={`/admin/card-details/${property._id}`} color="inherit" underline="hover">
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

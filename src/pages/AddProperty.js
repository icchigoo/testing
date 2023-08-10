import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Dropzone from "react-dropzone";

import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  Stack,
  Card,
  CardContent,
  Avatar,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { CameraAlt, Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import { useUploadImageContext } from "../context/UploadImageContext";

const schema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  dateofPurchase: Yup.string().required("Date of Purchase is required"),
  purchaseRate: Yup.number()
    .typeError("Purchase Rate must be a number")
    .required("Purchase Rate is required"),
  income: Yup.string().required("Income of Purchase is required"),
  type: Yup.string()
    .oneOf(["RESIDENTIAL", "COMMERCIAL", "INVESTMENT"], "Invalid property type")
    .required("Type is required"),
});

const AddProperty = () => {
  const { addProperty } = usePropertyContext();
  const { uploadedImages, uploadImagesToServer, deleteImageFromServer } =
    useUploadImageContext(); // Use the UploadImageContext
  const [showAlert, setShowAlert] = useState(false);
  const [images, setImages] = useState([]);



  useEffect(() => {
    setImages(uploadedImages); // Set the images from the context
  }, [uploadedImages]);

  const formik = useFormik({
    initialValues: {
      address: "",
      dateofPurchase: "",
      purchaseRate: "",
      images: "",
      income: "",
      type: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      values.images = images;
      await addProperty(values); // Using the context function
      resetForm();
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    },
  });

  return (
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
        <Button component={Link} to="/dashboard/products" variant="contained">
          Back
        </Button>
      </Stack>
      <Card elevation={3}>
        <CardContent>
          {showAlert && (
            <Box
              bgcolor="success.main"
              color="success.contrastText"
              p={2}
              mb={4}
              borderRadius={4}
            >
              Property created successfully!
            </Box>
          )}
          <Box py={2}>
            <Typography variant="h5" gutterBottom>
              Add Property
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Please fill in the details below to add a new property.
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            py={4}
          >
            <Dropzone
              onDrop={(acceptedFiles) => {
                const formData = new FormData();
                acceptedFiles.forEach((file) => {
                  formData.append("images", file);
                });
                uploadImagesToServer(formData);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <Box {...getRootProps()} style={{ position: "relative" }}>
                    <input {...getInputProps()} />
                    <Avatar
                      src={
                        uploadedImages.length > 0
                          ? uploadedImages[uploadedImages.length - 1].url
                          : ""
                      }
                      sx={{
                        width: 160,
                        height: 160,
                        borderRadius: "50%",
                        backgroundColor: "textSecondary",
                        border: "2px dashed grey",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {uploadedImages.length === 0 ? (
                        <CameraAlt fontSize="large" color="action" />
                      ) : null}
                    </Avatar>
                  </Box>

                  {uploadedImages.length > 0 && (
                    <IconButton
                      onClick={async () => {
                        const deletedImageId =
                          uploadedImages[uploadedImages.length - 1].public_id;

                        // Send the delete request to the backend
                        try {
                          await deleteImageFromServer(deletedImageId);
                          // Update local state or context with the updated image list
                          const updatedImages = uploadedImages.slice(0, -1);
                          setImages(updatedImages);
                        } catch (error) {
                          console.error("Error deleting image:", error);
                        }
                      }}
                      sx={{ position: "absolute", top: 5, right: 5 }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  )}
                </section>
              )}
            </Dropzone>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Purchase"
                  type="date"
                  name="dateofPurchase"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dateofPurchase}
                  error={
                    formik.touched.dateofPurchase &&
                    Boolean(formik.errors.dateofPurchase)
                  }
                  helperText={
                    formik.touched.dateofPurchase &&
                    formik.errors.dateofPurchase
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Purchase Rate"
                  type="number"
                  name="purchaseRate"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.purchaseRate}
                  error={
                    formik.touched.purchaseRate &&
                    Boolean(formik.errors.purchaseRate)
                  }
                  helperText={
                    formik.touched.purchaseRate && formik.errors.purchaseRate
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          ${" "}
                        </span>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Income"
                  name="income"
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.income}
                  error={formik.touched.income && Boolean(formik.errors.income)}
                  helperText={formik.touched.income && formik.errors.income}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span style={{ display: "flex", alignItems: "center" }}>
                          weekly
                        </span>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Type"
                  name="type"
                  select
                  variant="outlined"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
                >
                  <MenuItem value="RESIDENTIAL">Residential</MenuItem>
                  <MenuItem value="COMMERCIAL">Commercial</MenuItem>
                  <MenuItem value="INVESTMENT">Investment</MenuItem>
                </TextField>
              </Grid>

              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddProperty;

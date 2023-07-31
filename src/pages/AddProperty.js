import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProperty } from "../features/property/propertySlice";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  Stack
} from "@mui/material";
import Iconify from "../components/iconify/Iconify";

const schema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  dateofPurchase: Yup.string().required("Date of Purchase is required"),
  purchaseRate: Yup.number()
    .typeError("Purchase Rate must be a number")
    .required("Purchase Rate is required"),
  income: Yup.string().required("Income of Purchase is required"),
});

const AddProperty = () => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [images, setImages] = useState([]);
  const imgState = useSelector((state) => state.upload.images);
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  const formik = useFormik({
    initialValues: {
      address: "",
      dateofPurchase: "",
      purchaseRate: "",
      images: "",
      income: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(createProperty(values));
      resetForm();
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    },
  });

  return (
    
    <Container maxWidth="md">
         <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            mb={5}
          >
       
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:edit-fill" />}
           
             
            >
              Cancel
            </Button>
          </Stack>
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        py={4}
      >
       
        <Box
          width={200}
          height={200}
          borderRadius="50%"
          border="2px dashed grey"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <Box {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    Drag 'n' drop some files here,
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                  >
                    or click to select files
                  </Typography>
                </Box>
              </section>
            )}
          </Dropzone>
        </Box>
        <Box display="flex" gap={2} mt={2}>
          {imgState?.map((i, j) => (
            <Box position="relative" key={j}>
              <IconButton
                onClick={() => dispatch(delImg(i.public_id))}
                className="btn-close position-absolute top-3 right-3"
                color="secondary"
              ></IconButton>
              <img src={i.url} alt="" width={200} height={200} />
            </Box>
          ))}
        </Box>
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
              error={formik.touched.address && Boolean(formik.errors.address)}
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
                formik.touched.dateofPurchase && formik.errors.dateofPurchase
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
            />
          </Grid>

          <Grid item xs={12}    style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddProperty;

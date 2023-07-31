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
} from "@mui/material";

const schema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  dateofPurchase: Yup.string().required("Date of Purchase is required"),
  purchaseRate: Yup.number()
    .typeError("Purchase Rate must be a number")
    .required("Purchase Rate is required"),
  income: Yup.string().required("Income of Purchase is required"),
  loan: Yup.array().of(
    Yup.object().shape({
      loanAmountRemaining: Yup.number().required("Loan amount is required"),
      longTermRemaining: Yup.number().required("Long term remaining is required"),
      interestRate: Yup.number().required("Interest rate is required"),
    })
  ),
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
      loan: [
        {
          loanAmountRemaining: "",
          longTermRemaining: "",
          interestRate: "",
        },
      ],
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
        <Typography variant="h4" gutterBottom>
          Add Property
        </Typography>
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
          <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <Box {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Typography variant="body1" color="textSecondary" align="center">
                    Drag 'n' drop some files here,
                  </Typography>
                  <Typography variant="body1" color="textSecondary" align="center">
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
              >
             
              </IconButton>
              <img src={i.url} alt="" width={200} height={200} />
            </Box>
          ))}
        </Box>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
              helperText={formik.touched.purchaseRate && formik.errors.purchaseRate}
            />
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Loan Amount Remaining"
              name="loan[0].loanAmountRemaining"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.loan[0].loanAmountRemaining}
              error={
                formik.touched["loan[0].loanAmountRemaining"] &&
                Boolean(formik.errors.loan?.[0]?.loanAmountRemaining)
              }
              helperText={
                formik.touched["loan[0].loanAmountRemaining"] &&
                formik.errors.loan?.[0]?.loanAmountRemaining
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Long Term Remaining"
              name="loan[0].longTermRemaining"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.loan[0].longTermRemaining}
              error={
                formik.touched["loan[0].longTermRemaining"] &&
                Boolean(formik.errors.loan?.[0]?.longTermRemaining)
              }
              helperText={
                formik.touched["loan[0].longTermRemaining"] &&
                formik.errors.loan?.[0]?.longTermRemaining
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Interest Rate"
              name="loan[0].interestRate"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.loan[0].interestRate}
              error={
                formik.touched["loan[0].interestRate"] &&
                Boolean(formik.errors.loan?.[0]?.interestRate)
              }
              helperText={
                formik.touched["loan[0].interestRate"] &&
                formik.errors.loan?.[0]?.interestRate
              }
            />
          </Grid>
          <Grid item xs={12}>
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

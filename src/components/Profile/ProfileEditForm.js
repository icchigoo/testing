import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";

import { styled } from "@mui/material/styles";
import {
  Container,
  Avatar,
  Typography,
  Button,
  TextField,
  Grid,
  Stack,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import Iconify from "../iconify/Iconify";
import { useAuthContext } from "../../context/AuthContext";

const ProfileCard = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.paper,
  textAlign: "center",
}));

const DeleteCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.paper,
  textAlign: "center",

  maxHeight: 700,
}));

function ProfileEditForm({ onCancel }) {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const [userData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    mobile: user.mobile,
    address: user.address,
    images: user.images,
    country: user.country,
    postalCode: user.postalCode,
    taxId: user.taxId,
  });

  const formik = useFormik({
    initialValues: {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      mobile: userData.mobile,
      address: userData.address,
      images: userData.images,
      country: userData.country,
      postalCode: userData.postalCode,
      taxId: userData.taxId,
    },
    onSubmit: () => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    const updatedUserData = {
      firstname: formik.values.firstname,
      lastname: formik.values.lastname,
      email: formik.values.email,
      mobile: formik.values.mobile,
      address: formik.values.address,

      country: formik.values.country,
      postalCode: formik.values.postalCode,
      taxId: formik.values.taxId,
    };

    dispatch(updateUser(updatedUserData))
      .unwrap()
      .then(() => {
        // Handle success

        console.log("User updated successfully");
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating user:", error);
      });
  };

  return (
    <Container maxWidth>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:edit-fill" />}
          onClick={onCancel}
        >
          Cancel Edit
        </Button>
      </Stack>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <DeleteCard>
            <Button
              variant="contained"
              style={{ backgroundColor: "red", color: "#fff" }}
            >
              Delete User
            </Button>
          </DeleteCard>
        </Grid>
        <Grid item xs={12} sm={8}>
          <ProfileCard>
            <Grid container spacing={2}>
              {[
                "firstname",
                "lastname",
                "email",
                "mobile",
                "address",
                "country",
                "postalCode",
                "taxId",
              ].map((field) => (
                <Grid
                  item
                  xs={12}
                  sm={field === "address" || field === "country" ? 6 : 12}
                  key={field}
                >
                  <TextField
                    fullWidth
                    label={
                      field === "postalCode"
                        ? "Postal Code"
                        : field === "taxId"
                        ? "Tax ID"
                        : field
                    }
                    value={formik.values[field]}
                    name={field}
                    onChange={formik.handleChange}
                  />
                </Grid>
              ))}
            </Grid>
            <Box mt={2} style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" onClick={formik.handleSubmit}>
                Update User
              </Button>
            </Box>
          </ProfileCard>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfileEditForm;

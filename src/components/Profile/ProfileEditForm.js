import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Dropzone from "react-dropzone";
import { uploadImg } from "../../features/upload/uploadSlice";

const ProfileCard = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.paper,
  textAlign: "center",
  maxWidth: 800,
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
  maxWidth: 500,
  maxHeight: 700,
}));

const DropzoneContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 120,
  height: 120,
  borderRadius: "50%",
  border: `2px dashed ${theme.palette.grey[500]}`, // Change border style to dashed
  marginBottom: theme.spacing(7),
  backgroundColor: theme.palette.background.paper,
}));

function ProfileEditForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const imgState = useSelector((state) => state.upload.images);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Update userData with the latest image URLs
    setUserData((prevState) => ({
      ...prevState,
      images: imgState.map((i) => ({
        public_id: i.public_id,
        url: i.url,
      })),
    }));
  }, [imgState]);

  const [userData, setUserData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    mobile: user.mobile,
    address: user.address,
    images: user.images,
    // Add the new fields here, initialized to their current values
    country: user.country,
    postalCode: user.postalCode,
    taxId: user.taxId,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formik = useFormik({
    initialValues: {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      mobile: userData.mobile,
      address: userData.address,
      images: userData.images,
      // Update the formik initialValues with the new fields
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
      images: imgState.map((i) => ({
        public_id: i.public_id,
        url: i.url,
      })),
      // Include the new fields
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
        >
          Cancel Edit
        </Button>
      </Stack>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <DeleteCard>
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <DropzoneContainer {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Typography variant="body1" color="textSecondary">
                      {/* Show a message when there are no images */}
                      {user.images.length === 0
                        ? "Drag 'n' drop or click to select a file"
                        : ""}
                    </Typography>
                    {/* Show the user's profile picture if available */}
                    {user.images.length > 0 && (
                      <Avatar
                        alt={user.name}
                        src={user.images[0].url}
                        sx={{ width: 100, height: 100 }}
                      />
                    )}
                  </DropzoneContainer>
                </section>
              )}
            </Dropzone>

            <Button
              variant="contained"
              style={{ backgroundColor: "red", color: "#fff" }}
            >
              Delete User
            </Button>
          </DeleteCard>
        </Grid>

        {/* Right side (ProfileCard) */}
        <Grid item xs={12} sm={8}>
          <ProfileCard>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formik.values.firstname}
                  name="firstname"
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formik.values.lastname}
                  name="lastname"
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  label="Email address"
                  value={formik.values.email}
                  name="email"
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  label="Mobile"
                  value={formik.values.mobile}
                  name="mobile"
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm= {6}>
                <TextField
                  fullWidth
                  label="Address"
                  value={formik.values.address}
                  name="address"
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={formik.values.country}
                  name="country"
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={formik.values.postalCode}
                  name="postalCode"
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tax ID"
                  value={formik.values.taxId}
                  name="taxId"
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

            <Box mt={2}>
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

import React, { useEffect,  } from "react";
import { styled } from "@mui/material/styles";
import {
  Container,
  Avatar,

  Button,
  TextField,
  Grid,

} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/auth/authSlice";


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
  backgroundColor: theme.palette.background.default, // Set the background color to match the main background
  textAlign: "center",
  maxWidth: 500,
  maxHeight: 700,
}));

const ProfilePictureContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 120,
  height: 120,
  borderRadius: "50%",
  border: `2px solid ${theme.palette.grey[500]}`,
  marginBottom: theme.spacing(7),
}));

const General = () => {
  const dispatch = useDispatch();

  // Access the user profile data from the Redux store
  const user = useSelector((state) => state.auth.user);

  // useEffect hook to fetch the user profile data when the component mounts
  useEffect(() => {
    if (!user) {
      // Fetch the user profile data if it is not already available in the Redux store
      dispatch(
        fetchUser(/* Pass the user ID or any unique identifier to fetch the specific user's data */)
      );
    }
  }, [dispatch, user]);

  if (!user) {
    return <div>Loading...</div>; // You can show a loading state until the user data is fetched
  }

  return (
    <Container>
      <>
        <Grid container spacing={4}>
          {/* Left side (DeleteCard) */}
          <Grid item xs={12} sm={4}>
            <DeleteCard>
              <ProfilePictureContainer>
                <Avatar
                  alt={user.name}
                  src={user.images[0].url}
                  sx={{ width: 100, height: 100 }}
                />
              </ProfilePictureContainer>

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
                    value={user.firstname}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={user.lastname}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={user.mobile}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={user.address}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={user.country}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Postcode"
                    value={user.postcode}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email address"
                    value={user.email}
                    readOnly
                  />
                </Grid>
              </Grid>
            </ProfileCard>
          </Grid>
        </Grid>
      </>
    </Container>
  );
};

export default General;

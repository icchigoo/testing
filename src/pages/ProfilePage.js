import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Container, Avatar, Typography, Button, TextField, Grid, Stack } from "@mui/material";
import Iconify from '../components/iconify';
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/auth/authSlice";

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

const ProfilePage = () => {
  const dispatch = useDispatch();

  // Access the user profile data from the Redux store
  const user = useSelector((state) => state.auth.user);

  // useEffect hook to fetch the user profile data when the component mounts
  useEffect(() => {
    if (!user) {
      // Fetch the user profile data if it is not already available in the Redux store
      dispatch(fetchUser(/* Pass the user ID or any unique identifier to fetch the specific user's data */));
    }
  }, [dispatch, user]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:edit-fill" />}>
          Edit Profile
        </Button>
      </Stack>

      <Grid container spacing={4}>
        {/* Left side (DeleteCard) */}
        <Grid item xs={20} sm={4}>
          <DeleteCard>
            <ProfilePictureContainer>
              {/* Use the user data from the Redux store to display the profile picture */}
              <Avatar alt={user?.name} src={user?.images[0].url} sx={{ width: 100, height: 100 }} />
            </ProfilePictureContainer>

            <Button variant="contained" style={{ backgroundColor: "red", color: "#fff", }}>
              Delete User
            </Button>
          </DeleteCard>
        </Grid>

        {/* Right side (ProfileCard) */}
        <Grid item xs={12} sm={8}>
          <ProfileCard>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="First Name" value= {user?.firstname } />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Last Name" value={user?.lastname} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Phone Number" value={user?.mobile} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Address" value={user?.address} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Country" value={user?.country} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Postcode" value={user?.postcode} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email address" value={user?.email} />
              </Grid>
            </Grid>
          </ProfileCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;

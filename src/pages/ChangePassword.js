import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Container, Typography, Button, TextField, Grid } from "@mui/material";
import Iconify from "../components/iconify";

const ChangePasswordCard = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.paper,
  textAlign: "center",

}));

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveChanges = () => {
    // Handle password change logic here
    // For example: dispatch(changePassword(oldPassword, newPassword));
    console.log("Password change logic will be handled here.");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Change Password
      </Typography>
      <ChangePasswordCard>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Typography variant="body2" color="textSecondary">
              <Iconify icon="feather:key" fontSize={14} color="grey" /> Password must be minimum 6+
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </ChangePasswordCard>
    </Container>
  );
};

export default ChangePasswordPage;

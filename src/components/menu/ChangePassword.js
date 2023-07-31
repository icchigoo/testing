import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../features/auth/authSlice";
import { Card, CardContent, CardHeader, TextField, Button, Grid } from "@mui/material";

const ChangePasswordPage = ({ user }) => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = () => {
    if (newPassword.trim() === "") {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    dispatch(updatePassword(newPassword))
      .then(() => {
        alert("Password updated successfully");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
      })
      .catch((error) => {
        setError(`Failed to update password: ${error.message}`);
      });
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Change Password" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="New Password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Button variant="contained" color="primary" onClick={handlePasswordChange}>
              Change Password
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordPage;

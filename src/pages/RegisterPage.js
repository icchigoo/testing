// RegisterPage.js
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import { Link, Container, Typography, Stack, Button, TextField, Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import { createUser } from "../features/auth/authSlice";
import Logo from "../components/logo";

const StyledRoot = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  }));
  
  const StyledSection = styled("div")(({ theme }) => ({
    width: "100%",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
  }));
  
  const StyledContent = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
  }));



export default function RegisterPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [credentialsError, setCredentialsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    // Extract other form data for registration, if needed

    try {
      setIsLoading(true);
      // Call the createUser action to register the user
      const response = await dispatch(createUser({ firstname, lastname, email, password }));
      if (response !== null) {
        // Handle successful registration (e.g., show a success message, redirect to dashboard)
      } else {
        setCredentialsError(true);
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      setCredentialsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title> Register | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <StyledSection>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/assets/illustrations/illustration_login.png" alt="login" />
        </StyledSection>
        
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Create an Account
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Already have an account? {""}
              <Link variant="subtitle2" href="/login">Login</Link>
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Registration form fields */}
              <Stack spacing={3}>
                <TextField name="firstname" label="First Name" required />
                <TextField name="lastname" label="Last Name" required />
                <TextField name="email" label="Email address" required />
                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      // Eye icon button to toggle password visibility
                      <Button onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</Button>
                    ),
                  }}
                  required
                />

                {/* Add other registration form fields as needed */}
                {/* <TextField name="mobile" label="Mobile Number" /> */}
                {/* <TextField name="address" label="Address" /> */}
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <Checkbox name="termsAndConditions" label="I agree to the terms and conditions" required />
              </Stack>

              {credentialsError && <div className="text-red-500">Error occurred during registration.</div>}

              <Button fullWidth size="large" type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </form>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

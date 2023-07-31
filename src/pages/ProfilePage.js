import React, {  useState } from "react";
import {} from "@mui/material/styles";
import { Container, Typography, Button, Stack } from "@mui/material";
import Iconify from "../components/iconify";
import {  useSelector } from "react-redux";

import ProfileEditForm from "../components/Profile/ProfileEditForm";
import MenuBar from "../components/menu/MeunBar";
import General from "../components/menu/General";
import ChangePasswordPage from "../components/menu/ChangePassword";


const ProfilePage = () => {


  // Access the user profile data from the Redux store
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, ] = useState({ ...user });
  const [selectedTab, setSelectedTab] = useState(0);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSaveChanges = () => {
    // Call the onSaveChanges callback with the edited user data
    // You can dispatch an action to save the editedUser data in the Redux store
    // For example: dispatch(updateUserProfile(editedUser));

    // After saving changes, exit the edit mode
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Exit the edit mode without saving changes
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading...</div>; // You can show a loading state until the user data is fetched
  }

  return (
    <Container>
      {!isEditing ? (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:edit-fill" />}
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          </Stack>
          <MenuBar selectedTab={selectedTab} onTabChange={handleTabChange} />
      {selectedTab === 0 && <General />}
      {selectedTab === 1 && <ChangePasswordPage />}
        </>
      ) : (
        // Render the ProfileEditForm section if in edit mode
        <ProfileEditForm
          user={editedUser}
          onSaveChanges={handleSaveChanges}
          onCancel={handleCancelEdit}
        />
      )}
    </Container>
  );
};

export default ProfilePage;

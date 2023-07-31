import React from "react";
import { AppBar, Tabs, Tab } from "@mui/material";
import Iconify from "../iconify/Iconify";
import "./menu.css";

const MenuBar = ({ selectedTab, onTabChange }) => {
  const handleTabChange = (_, newValue) => {
    onTabChange(_, newValue);
  };

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="scrollable"
        scrollButtons="auto"
        className="menu-tabs"
      >
        <Tab
          label={
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "18px" }}>
              <Iconify icon="ion:settings-outline" color={selectedTab === 0 ? "black" : "grey"} />
              General
            </span>
          }
          iconPlacement="start"
        />
        <Tab
          label={
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "16px" }}>
              <Iconify icon="bi:shield-fill" color={selectedTab === 1 ? "black" : "grey"} />
              Security
            </span>
          }
          iconPlacement="start"
        />
        <Tab
          label={
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "16px" }}>
              <Iconify icon="ic:baseline-people" color={selectedTab === 2 ? "black" : "grey"} />
              Social
            </span>
          }
          iconPlacement="start"
        />
        <Tab
          label={
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "16px" }}>
              <Iconify icon="bi:credit-card-2-front-fill" color={selectedTab === 3 ? "black" : "grey"} />
              Billing
            </span>
          }
          iconPlacement="start"
        />
        <Tab
          label={
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "16px" }}>
              <Iconify icon="ic:baseline-notifications" color={selectedTab === 4 ? "black" : "grey"} />
              Notification
            </span>
          }
          iconPlacement="start"
        />
      </Tabs>
    </AppBar>
  );
};

export default MenuBar;

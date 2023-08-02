import React from "react";
import { AppBar, Tabs, Tab } from "@mui/material";
import Iconify from "../iconify/Iconify";
import "./propertymenubar.css";

const PropertyMenuBar = ({ selectedTab, onTabChange }) => {
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
              <Iconify icon="ic:baseline-info" color={selectedTab === 0 ? "black" : "grey"} />
              Overview
            </span>
          }
          iconPlacement="start"
        />
        <Tab
          label={
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "16px" }}>
              <Iconify icon="ic:baseline-swap-horiz" color={selectedTab === 1 ? "black" : "grey"} />
              Transaction
            </span>
          }
          iconPlacement="start"
        />
        <Tab
          label={
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "16px" }}>
              <Iconify icon="ic:baseline-account-balance" color={selectedTab === 2 ? "black" : "grey"} />
              Loan
            </span>
          }
          iconPlacement="start"
        />
        <Tab
          label={
            <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "16px" }}>
              <Iconify icon="fa-solid:chart-line" color={selectedTab === 3 ? "black" : "grey"} />
              Valuation
            </span>
          }
          iconPlacement="start"
        />
      </Tabs>
    </AppBar>
  );
};

export default PropertyMenuBar;

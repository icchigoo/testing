import React from "react";
import { useParams } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import Typography from "@mui/material/Typography";

const CardDetails = () => {
  const { propertyId } = useParams(); // Assuming you're using react-router for routing


  const properties = usePropertyContext();
  const propertyDetails = properties.find(
    (property) => property._id === propertyId
  );

  console.log("Property ID:", propertyId);
  console.log("Fetched Properties:", properties);

  return (
    <div>
      {propertyDetails ? (
        <div>
          <Typography variant="h4">Property Details</Typography>
          <Typography variant="subtitle1">
            Name: {propertyDetails.name}
          </Typography>
          <Typography variant="subtitle1">
            Address: {propertyDetails.address}
          </Typography>
          {/* Display other property details as needed */}
        </div>
      ) : (
        <Typography variant="subtitle1">Property not found.</Typography>
      )}
    </div>
  );
};

export default CardDetails;

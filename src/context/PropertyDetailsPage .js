import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../utils/baseUrl";
import { config } from "../utils/config";

function PropertyDetailsPage() {
  const { propertyId } = useParams(); // Get the property ID from the URL parameter
  const [propertyDetails, setPropertyDetails] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`${base_url}property/${propertyId}`, config);
        const data = response.data;
        setPropertyDetails(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (!propertyDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Property Details</h2>
      <p>Name: {propertyDetails.name}</p>
      {/* Render other property details */}
    </div>
  );
}

export default PropertyDetailsPage;

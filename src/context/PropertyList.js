import React from "react";
import { usePropertyContext } from "./PropertyContext";

function PropertyList() {
  const properties = usePropertyContext();

  return (
    <div>
      <h2>Property List</h2>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>{property.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;

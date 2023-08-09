import React from "react";
import { usePropertyContext } from "./PropertyContext";
import { Link } from "react-router-dom";

function PropertyList() {
  const properties = usePropertyContext();

  return (
    <div>
      <h2>Property List</h2>
      <ul>
        {properties.map((property) => (
          <li key={property._id}>
            <Link to={`/property/${property._id}`}>{property.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;

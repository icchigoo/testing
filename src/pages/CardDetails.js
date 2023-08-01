import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import propertyService from "../features/property/propertyService"
import OverviewPage from "./OverviewPage";


const CardDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          const response = await propertyService.getPropertyById(productId);
          if (response) {
            setProduct(response);
          } else {
            // Handle the case when response is null or empty
            // For example, display an error message or redirect to another page
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching product details:", error);
        }
      };
  
      fetchProductDetails();
    }, [productId]);
  
    // Loading state
    if (loading) {
      return <div>Loading...</div>;
    }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mt-8 mb-4">Property</h1>
      </div>
      <div className="container mx-auto ">
        <div className="rounded-lg shadow-lg bg-white">
          <div className="p-4">
            {/* Address and Purchase Rate */}
            <div className="mb-6">
              <p className="mb-2 font-bold text-lg">
                {product.address}, {product.state}
                <h4 className="text-sm font-semibold text-green-500">
                  Purchase Rate ${product.purchaseRate}
                </h4>
              </p>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 px-4 mb-4 lg:mb-0">
                <OverviewPage propertyId={productId} onClose={() => {}} />
              </div>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;

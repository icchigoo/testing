import React, { useEffect, useState } from "react";
import propertyService from "../features/property/propertyService";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import {
  FaHome,
  FaMapMarkerAlt,
  FaCalendar,
  FaFlag,
  FaMoneyBillAlt,
  FaPercent,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";

const OverviewPage = ({ propertyId, onClose }) => {
  const [property, setProperty] = useState(null);
  const [isPropertySectionCollapsed, setIsPropertySectionCollapsed] =
    useState(false);
  const [isPurchaseCostSectionCollapsed, setIsPurchaseCostSectionCollapsed] =
    useState(false);
  const [isExpensesSectionCollapsed, setIsExpensesSectionCollapsed] =
    useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await propertyService.getPropertyById(propertyId);
        setProperty(response);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (!property) {
    return <LoadingSpinner />;
  }

  // Function to format currency with commas for better readability
 // Function to format currency with commas for better readability
const formatCurrency = (value) => {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? "";
};

  // Function to handle section collapse/expand for property section
  const togglePropertySection = () => {
    setIsPropertySectionCollapsed((prevState) => !prevState);
  };

  // Function to handle section collapse/expand for purchase cost section
  const togglePurchaseCostSection = () => {
    setIsPurchaseCostSectionCollapsed((prevState) => !prevState);
  };

  // Function to handle section collapse/expand for expenses section
  const toggleExpensesSection = () => {
    setIsExpensesSectionCollapsed((prevState) => !prevState);
  };

  return (
    <div className="p-4">
      <div className="container max-w-3xl">
        {/* Property Section */}
        <div className="mb-4">
          <h3
            className={`text-xl font-semibold mb-2 bg-gray-200 p-2 rounded-lg cursor-pointer flex items-center transition-all duration-300 ${
              isPropertySectionCollapsed ? "h-10" : "h-auto"
            }`}
            onClick={togglePropertySection}
          >
            <FaHome className="mr-2 text-blue-500 text-xl inline-block align-middle" />
            <span className="inline-block align-middle">Property</span>
            <span className="ml-auto">
              {isPropertySectionCollapsed ? <FaAngleDown /> : <FaAngleUp />}
            </span>
          </h3>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isPropertySectionCollapsed ? "h-0" : "h-auto"
            }`}
          >
            <div className="flex flex-wrap">
              {/* Property Name */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaHome className="mr-2 text-green-500 text-lg" />
                  <span className="text-green-600">Property Name</span>
                </h4>
                <p className="text-gray-600">{property.name}</p>
              </div>

              {/* Property Address */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-red-500 text-lg" />
                  <span className="text-red-600">Property Address</span>
                </h4>
                <p className="text-gray-600">{property.address}</p>
              </div>

              {/* Date of Purchase */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaCalendar className="mr-2 text-purple-500 text-lg" />
                  <span className="text-purple-600">Date of Purchase</span>
                </h4>
                <p className="text-gray-600">{property.dateofPurchase}</p>
              </div>

              {/* Suburb */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-blue-500 text-lg" />
                  <span className="text-blue-600">Suburb</span>
                </h4>
                <p className="text-gray-600">{property.suburb}</p>
              </div>

              {/* Post Code */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-yellow-500 text-lg" />
                  <span className="text-yellow-600">Post Code</span>
                </h4>
                <p className="text-gray-600">{property.postCode}</p>
              </div>

              {/* State */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaFlag className="mr-2 text-green-500 text-lg" />
                  <span className="text-green-600">State</span>
                </h4>
                <p className="text-gray-600">{property.state}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Cost Section */}
        <div className="mb-4">
          <h3
            className={`text-xl font-semibold mb-2 bg-gray-200 p-2 rounded-lg cursor-pointer flex items-center transition-all duration-300 ${
              isPurchaseCostSectionCollapsed ? "h-10" : "h-auto"
            }`}
            onClick={togglePurchaseCostSection}
          >
            <FaMoneyBillAlt className="mr-2 text-blue-500 text-xl inline-block align-middle" />
            <span className="inline-block align-middle">Purchase Cost</span>
            <span className="ml-auto">
              {isPurchaseCostSectionCollapsed ? <FaAngleDown /> : <FaAngleUp />}
            </span>
          </h3>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isPurchaseCostSectionCollapsed ? "h-0" : "h-auto"
            }`}
          >
            <div className="flex flex-wrap">
              {/* Purchase Rate */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaMoneyBillAlt className="mr-2 text-purple-500 text-lg" />
                  <span className="text-purple-600">Purchase Rate</span>
                </h4>
                <p className="text-gray-600">{property.purchaseRate}</p>
              </div>

              {/* Rental Income */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaMoneyBillAlt className="mr-2 text-red-500 text-lg" />
                  <span className="text-red-600">Rental Income (Weekly)</span>
                </h4>
                <p className="text-gray-600">
                  ${formatCurrency(property?.rentalIncome)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expenses Section */}
        <div>
          <h3
            className={`text-xl font-semibold mb-2 bg-gray-200 p-2 rounded-lg cursor-pointer flex items-center transition-all duration-300 ${
              isExpensesSectionCollapsed ? "h-10" : "h-auto"
            }`}
            onClick={toggleExpensesSection}
          >
            <FaMoneyBillAlt className="mr-2 text-blue-500 text-xl inline-block align-middle" />
            <span className="inline-block align-middle">Expenses</span>
            <span className="ml-auto">
              {isExpensesSectionCollapsed ? <FaAngleDown /> : <FaAngleUp />}
            </span>
          </h3>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpensesSectionCollapsed ? "h-0" : "h-auto"
            }`}
          >
            <div className="flex flex-wrap">
              {/* Strata Body Corporate (Quarterly) */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaMoneyBillAlt className="mr-2 text-purple-500 text-lg" />
                  <span className="text-purple-600">
                    Strata Body Corporate (Quarterly)
                  </span>
                </h4>
                <p className="text-gray-600">
                  ${formatCurrency(property?.strataBodyCorporate)}
                </p>
              </div>

              {/* Council Rates (Yearly) */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaMoneyBillAlt className="mr-2 text-red-500 text-lg" />
                  <span className="text-red-600">Council Rates (Yearly)</span>
                </h4>
                <p className="text-gray-600">
                  ${formatCurrency(property?.councilRates)}
                </p>
              </div>

              {/* Water Rates (Yearly) */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaMoneyBillAlt className="mr-2 text-blue-500 text-lg" />
                  <span className="text-blue-600">Water Rates (Yearly)</span>
                </h4>
                <p className="text-gray-600">
                  ${formatCurrency(property?.waterRates)}
                </p>
              </div>

              {/* Insurance Premium (Yearly) */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaMoneyBillAlt className="mr-2 text-yellow-500 text-lg" />
                  <span className="text-yellow-600">
                    Insurance Premium (Yearly)
                  </span>
                </h4>
                <p className="text-gray-600">
                  ${formatCurrency(property?.insurancePremium)}
                </p>
              </div>

              {/* Management Fee (% of Rent) */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaPercent className="mr-2 text-green-500 text-lg" />
                  <span className="text-green-600">
                    Management Fee (% of Rent)
                  </span>
                </h4>
                <p className="text-gray-600">{property.managementFee}%</p>
              </div>

              {/* Maintenance (% of Rent) */}
              <div className="w-full md:w-1/2 mb-2 bg-gray-50 p-2 rounded-lg">
                <h4 className="text-lg font-semibold flex items-center">
                  <FaPercent className="mr-2 text-purple-500 text-lg" />
                  <span className="text-purple-600">
                    Maintenance (% of Rent)
                  </span>
                </h4>
                <p className="text-gray-600">{property.maintenance}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;

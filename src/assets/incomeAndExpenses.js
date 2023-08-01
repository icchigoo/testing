export const DEFAULT_INCOMES = [
  { label: 'Income 1', frequency: 52, key: 1, value: 0 },
  { label: 'Income 2', frequency: 52, key: 2, value: 0 },
  { label: 'Other Income', frequency: 52, key: 3, value: 0 },
];

export const DEFAULT_HOUSE_HOLD_EXPENSES = {
  livingExpenses: [
    { key: 1, label: 'Health Insurance', frequency: 52, value: 0 },
    { key: 2, label: 'Mobile', frequency: 52, value: 0 },
  ],
  entertainmentExpenses: [
    { key: 1, label: 'Holiday Flights', frequency: 52, value: 0 },
    { key: 2, label: 'Membership/ Subscription Fees', frequency: 52, value: 0 },
  ],
  transportExpenses: [
    { key: 1, label: 'Fuel - car', frequency: 52, value: 0 },
    { key: 2, label: 'Maintenance/Repairs - car', frequency: 52, value: 0 },
  ],
  houseExpenses: [
    { key: 1, label: 'Appliances & Furniture & Homewares', frequency: 52, value: 0 },
    { key: 2, label: 'Council Rates', frequency: 52, value: 0 },
  ],
};

// Format currency with proper handling
export const formatCurrency = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "$0";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format number with commas
export const formatNumber = (value: string): string => {
  const num = value.replace(/,/g, "");
  if (num === "" || isNaN(Number(num))) return "";
  return Number(num).toLocaleString();
};

// Parse number safely
export const parseNumber = (value: string): number => {
  const num = value.replace(/,/g, "");
  return isNaN(Number(num)) ? 0 : Number(num);
};

// Closing Costs Calculations
export const calculateClosingCostsLogic = (
  propertyPrice: number,
  hstAmount: number,
  hstRebated: boolean,
  landTransferTax: number,
  devCharge: number,
  lawyerFee: number,
  includeAgentCommission: boolean
) => {
  // Calculate Agent Commission automatically as 5% of property price
  const agentCommission = includeAgentCommission ? propertyPrice * 0.05 : 0;

  // Basic closing costs (excluding Agent Commission)
  const basicClosingCosts = {
    HST: hstRebated ? 0 : hstAmount,
    "Land Transfer Tax": landTransferTax,
    "Dev. Charge": devCharge,
    "Lawyer Fee": lawyerFee,
  };

  // Calculate totals
  const basicTotal = Object.values(basicClosingCosts).reduce(
    (sum, cost) => sum + cost,
    0
  );

  const totalWithAgent = basicTotal + agentCommission;

  return {
    basicClosingCosts,
    agentCommission,
    totalCosts: basicTotal,
    totalWithAgent,
  };
};

// Occupancy Costs Calculations
export const calculateOccupancyCostsLogic = (
  lawyerFee: number,
  occupancyFee: number,
  months: number
) => {
  const totalOccupancyFee = occupancyFee * months;

  const costBreakdown = {
    "Lawyer Fee": lawyerFee,
    "Occupancy Fee": totalOccupancyFee,
  };

  const totalCosts = Object.values(costBreakdown).reduce(
    (sum, cost) => sum + cost,
    0
  );

  return {
    costBreakdown,
    totalCosts,
  };
};

// Mortgage Calculations
export const calculateMortgageLogic = (
  propertyPrice: number,
  downPaymentPercent: number,
  interestRate: number
) => {
  // Calculate down payment amount
  const downPayment = propertyPrice * (downPaymentPercent / 100);
  const loanAmount = propertyPrice - downPayment;

  // Simple calculation: price × (1 - down ratio) × (interest rate / 12) × 1.5
  const downRatio = downPaymentPercent / 100;
  const monthlyPayment =
    propertyPrice * (1 - downRatio) * (interestRate / 100 / 12) * 1.5;

  return {
    monthlyPayment,
    downPayment,
    loanAmount,
  };
}; 
import {
  calculateClosingCostsLogic,
  calculateOccupancyCostsLogic,
  calculateMortgageLogic,
} from "./calculations";

export interface ClosingCostsRequest {
  propertyPrice: number;
  hstAmount: number;
  hstRebated: boolean;
  landTransferTax: number;
  devCharge: number;
  lawyerFee: number;
  includeAgentCommission: boolean;
}

export interface ClosingCostsResponse {
  success: boolean;
  data?: {
    basicClosingCosts: Record<string, number>;
    agentCommission: number;
    totalCosts: number;
    totalWithAgent: number;
  };
  error?: string;
}

export interface OccupancyCostsRequest {
  lawyerFee: number;
  occupancyFee: number;
  months: number;
}

export interface OccupancyCostsResponse {
  success: boolean;
  data?: {
    costBreakdown: Record<string, number>;
    totalCosts: number;
  };
  error?: string;
}

export interface MortgageRequest {
  propertyPrice: number;
  downPaymentPercent: number;
  interestRate: number;
}

export interface MortgageResponse {
  success: boolean;
  data?: {
    monthlyPayment: number;
    downPayment: number;
    loanAmount: number;
  };
  error?: string;
}

// Client-side calculation functions
export const calculateClosingCostsAPI = async (
  data: ClosingCostsRequest
): Promise<ClosingCostsResponse> => {
  try {
    const result = calculateClosingCostsLogic(
      data.propertyPrice,
      data.hstAmount,
      data.hstRebated,
      data.landTransferTax,
      data.devCharge,
      data.lawyerFee,
      data.includeAgentCommission
    );

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error calculating closing costs:", error);
    return {
      success: false,
      error: "Failed to calculate closing costs. Please try again.",
    };
  }
};

export const calculateOccupancyCostsAPI = async (
  data: OccupancyCostsRequest
): Promise<OccupancyCostsResponse> => {
  try {
    const result = calculateOccupancyCostsLogic(
      data.lawyerFee,
      data.occupancyFee,
      data.months
    );

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error calculating occupancy costs:", error);
    return {
      success: false,
      error: "Failed to calculate occupancy costs. Please try again.",
    };
  }
};

export const calculateMortgageAPI = async (
  data: MortgageRequest
): Promise<MortgageResponse> => {
  try {
    const result = calculateMortgageLogic(
      data.propertyPrice,
      data.downPaymentPercent,
      data.interestRate
    );

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error calculating mortgage:", error);
    return {
      success: false,
      error: "Failed to calculate mortgage. Please try again.",
    };
  }
};

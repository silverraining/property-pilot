const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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

// API 호출 함수들
export const calculateClosingCostsAPI = async (
  data: ClosingCostsRequest
): Promise<ClosingCostsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate-closing-costs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error calling closing costs API:", error);
    return {
      success: false,
      error: "Failed to connect to server. Please try again.",
    };
  }
};

export const calculateOccupancyCostsAPI = async (
  data: OccupancyCostsRequest
): Promise<OccupancyCostsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate-occupancy-costs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error calling occupancy costs API:", error);
    return {
      success: false,
      error: "Failed to connect to server. Please try again.",
    };
  }
};

export const calculateMortgageAPI = async (
  data: MortgageRequest
): Promise<MortgageResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate-mortgage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error calling mortgage API:", error);
    return {
      success: false,
      error: "Failed to connect to server. Please try again.",
    };
  }
};

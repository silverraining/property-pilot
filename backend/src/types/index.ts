import { Request, Response } from "express";

// Closing Costs Types
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

// Occupancy Costs Types
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

// Mortgage Types
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

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Express Request/Response with custom body
export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface TypedResponse<T> extends Response {
  json: (body: T) => TypedResponse<T>;
}

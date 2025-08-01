import { Request, Response } from "express";
import {
  TypedRequestBody,
  TypedResponse,
  MortgageRequest,
  MortgageResponse,
} from "../types";
import { calculateMortgageLogic } from "../utils/calculations";

export const calculateMortgage = (
  req: TypedRequestBody<MortgageRequest>,
  res: TypedResponse<MortgageResponse>
) => {
  try {
    const { propertyPrice, downPaymentPercent, interestRate } = req.body;

    // Input validation
    if (isNaN(propertyPrice) || propertyPrice <= 0) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid property price.",
      });
    }

    if (
      isNaN(downPaymentPercent) ||
      downPaymentPercent < 0 ||
      downPaymentPercent > 100
    ) {
      return res.status(400).json({
        success: false,
        error: "Down payment percentage must be between 0 and 100.",
      });
    }

    if (isNaN(interestRate) || interestRate <= 0) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid interest rate.",
      });
    }

    // Calculate mortgage
    const result = calculateMortgageLogic(
      propertyPrice,
      downPaymentPercent,
      interestRate
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error calculating mortgage:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error occurred while calculating mortgage.",
    });
  }
};

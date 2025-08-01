import { Request, Response } from "express";
import {
  TypedRequestBody,
  TypedResponse,
  ClosingCostsRequest,
  ClosingCostsResponse,
} from "../types";
import { calculateClosingCostsLogic } from "../utils/calculations";

export const calculateClosingCosts = (
  req: TypedRequestBody<ClosingCostsRequest>,
  res: TypedResponse<ClosingCostsResponse>
) => {
  try {
    const {
      propertyPrice,
      hstAmount,
      hstRebated,
      landTransferTax,
      devCharge,
      lawyerFee,
      includeAgentCommission,
    } = req.body;

    // Input validation
    if (isNaN(propertyPrice) || propertyPrice <= 0) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid property price.",
      });
    }

    if (isNaN(hstAmount) || hstAmount < 0) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid HST amount.",
      });
    }

    if (isNaN(landTransferTax) || landTransferTax < 0) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid Land Transfer Tax amount.",
      });
    }

    if (isNaN(devCharge) || devCharge < 0) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid Development Charge amount.",
      });
    }

    if (isNaN(lawyerFee) || lawyerFee < 0) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid Lawyer Fee amount.",
      });
    }

    // Calculate closing costs
    const result = calculateClosingCostsLogic(
      propertyPrice,
      hstAmount,
      hstRebated,
      landTransferTax,
      devCharge,
      lawyerFee,
      includeAgentCommission
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error calculating closing costs:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error occurred while calculating closing costs.",
    });
  }
};

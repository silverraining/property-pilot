import { Request, Response } from "express";
import {
  TypedRequestBody,
  TypedResponse,
  OccupancyCostsRequest,
  OccupancyCostsResponse,
} from "../types";
import { calculateOccupancyCostsLogic } from "../utils/calculations";

export const calculateOccupancyCosts = (
  req: TypedRequestBody<OccupancyCostsRequest>,
  res: TypedResponse<OccupancyCostsResponse>
) => {
  try {
    const { lawyerFee, occupancyFee, months } = req.body;

    // Input validation
    if (isNaN(lawyerFee) || lawyerFee < 0) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid lawyer fee.",
      });
    }

    if (isNaN(occupancyFee) || occupancyFee < 0) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid occupancy fee.",
      });
    }

    if (isNaN(months) || months < 1) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid number of months (minimum 1).",
      });
    }

    // Calculate occupancy costs
    const result = calculateOccupancyCostsLogic(
      lawyerFee,
      occupancyFee,
      months
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error calculating occupancy costs:", error);
    return res.status(500).json({
      success: false,
      error:
        "Internal server error occurred while calculating occupancy costs.",
    });
  }
};

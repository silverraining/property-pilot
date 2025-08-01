import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { calculateClosingCosts } from "./controllers/closingCostsController";
import { calculateOccupancyCosts } from "./controllers/occupancyCostsController";
import { calculateMortgage } from "./controllers/mortgageController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/calculate-closing-costs", calculateClosingCosts);
app.post("/api/calculate-occupancy-costs", calculateOccupancyCosts);
app.post("/api/calculate-mortgage", calculateMortgage);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Property Calculator API is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   POST /api/calculate-closing-costs`);
  console.log(`   POST /api/calculate-occupancy-costs`);
  console.log(`   POST /api/calculate-mortgage`);
  console.log(`   GET  /api/health`);
});

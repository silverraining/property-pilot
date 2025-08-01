import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { calculateClosingCosts } from "./controllers/closingCostsController";
import { calculateOccupancyCosts } from "./controllers/occupancyCostsController";
import { calculateMortgage } from "./controllers/mortgageController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://property-pilot.vercel.app",
    "https://property-pilot-git-main-silverraining.vercel.app",
    "https://property-pilot-silverraining.vercel.app",
    /\.vercel\.app$/, // 모든 Vercel 도메인 허용
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Property Pilot API is running" });
});

// API routes
app.post("/api/calculate-closing-costs", calculateClosingCosts);
app.post("/api/calculate-occupancy-costs", calculateOccupancyCosts);
app.post("/api/calculate-mortgage", calculateMortgage);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   POST /api/calculate-closing-costs`);
  console.log(`   POST /api/calculate-occupancy-costs`);
  console.log(`   POST /api/calculate-mortgage`);
  console.log(`   GET  /api/health`);
});

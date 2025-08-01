"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { calculateOccupancyCostsAPI } from "../../utils/api";
import { ClientOnly } from "../../components/ClientOnly";

// Format currency with proper handling
const formatCurrency = (amount: number | null | undefined): string => {
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
const formatNumber = (value: string): string => {
  const num = value.replace(/,/g, "");
  if (num === "" || isNaN(Number(num))) return "";
  return Number(num).toLocaleString();
};

// Parse number safely
const parseNumber = (value: string): number => {
  const num = value.replace(/,/g, "");
  return isNaN(Number(num)) ? 0 : Number(num);
};

export default function OccupancyCostCalculator() {
  const { t } = useTranslation();
  const [lawyerFee, setLawyerFee] = useState("");
  const [occupancyFee, setOccupancyFee] = useState("");
  const [months, setMonths] = useState("");
  const [breakdown, setBreakdown] = useState<Record<string, number> | null>(
    null
  );
  const [totalCosts, setTotalCosts] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateOccupancyCosts = async () => {
    setIsLoading(true);
    setError(null);

    const lawyer = parseNumber(lawyerFee);
    const occupancy = parseNumber(occupancyFee);
    const monthCount = parseNumber(months);

    // Input validation
    if (isNaN(lawyer) || lawyer < 0) {
      setError(t("errors.validLawyerFee"));
      setIsLoading(false);
      return;
    }

    if (isNaN(occupancy) || occupancy < 0) {
      setError(t("errors.validOccupancyFee"));
      setIsLoading(false);
      return;
    }

    if (isNaN(monthCount) || monthCount < 1) {
      setError(t("errors.validMonths"));
      setIsLoading(false);
      return;
    }

    try {
      const response = await calculateOccupancyCostsAPI({
        lawyerFee: lawyer,
        occupancyFee: occupancy,
        months: monthCount,
      });

      if (response.success && response.data) {
        const {
          costBreakdown: costBreakdownResult,
          totalCosts: totalCostsResult,
        } = response.data;

        setBreakdown(costBreakdownResult);
        setTotalCosts(totalCostsResult);
      } else {
        setError(response.error || t("errors.calculationError"));
      }
    } catch (error) {
      setError(t("errors.serverError"));
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setLawyerFee("");
    setOccupancyFee("");
    setMonths("");
    setBreakdown(null);
    setTotalCosts(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <ClientOnly
            fallback={
              <Link
                href="/"
                className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4"
              >
                ← Back to Home
              </Link>
            }
          >
            <Link
              href="/"
              className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4"
            >
              {t("common.backToHome")}
            </Link>
          </ClientOnly>
          <ClientOnly
            fallback={
              <>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Occupancy Cost Calculator
                </h1>
                <p className="text-gray-600">
                  Calculate your occupancy costs including lawyer fees and
                  monthly fees
                </p>
              </>
            }
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {t("occupancyCosts.title")}
            </h1>
            <p className="text-gray-600">{t("occupancyCosts.subtitle")}</p>
          </ClientOnly>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ClientOnly
              fallback={
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Cost Details
                </h2>
              }
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {t("occupancyCosts.costDetails")}
              </h2>
            </ClientOnly>

            <div className="space-y-4">
              <div>
                <ClientOnly
                  fallback={
                    <label
                      htmlFor="lawyerFee"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Lawyer Fee
                    </label>
                  }
                >
                  <label
                    htmlFor="lawyerFee"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("occupancyCosts.fields.lawyerFee")}
                  </label>
                </ClientOnly>
                <input
                  type="text"
                  id="lawyerFee"
                  value={formatNumber(lawyerFee)}
                  onChange={(e) =>
                    setLawyerFee(e.target.value.replace(/,/g, ""))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder={t("occupancyCosts.placeholders.lawyerFee")}
                />
              </div>

              <div>
                <ClientOnly
                  fallback={
                    <label
                      htmlFor="occupancyFee"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Occupancy Fee (Monthly)
                    </label>
                  }
                >
                  <label
                    htmlFor="occupancyFee"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("occupancyCosts.fields.occupancyFee")}
                  </label>
                </ClientOnly>
                <input
                  type="text"
                  id="occupancyFee"
                  value={formatNumber(occupancyFee)}
                  onChange={(e) =>
                    setOccupancyFee(e.target.value.replace(/,/g, ""))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder={t("occupancyCosts.placeholders.occupancyFee")}
                />
              </div>

              <div>
                <ClientOnly
                  fallback={
                    <label
                      htmlFor="months"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Number of Months
                    </label>
                  }
                >
                  <label
                    htmlFor="months"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("occupancyCosts.fields.months")}
                  </label>
                </ClientOnly>
                <input
                  type="number"
                  id="months"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  min="1"
                  max="60"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder={t("occupancyCosts.placeholders.months")}
                />
              </div>

              <div className="flex space-x-4">
                <ClientOnly
                  fallback={
                    <button
                      onClick={calculateOccupancyCosts}
                      disabled={isLoading}
                      className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Calculating..." : "Calculate"}
                    </button>
                  }
                >
                  <button
                    onClick={calculateOccupancyCosts}
                    disabled={isLoading}
                    className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading
                      ? t("common.calculating")
                      : t("common.calculate")}
                  </button>
                </ClientOnly>
                <ClientOnly
                  fallback={
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                    >
                      Reset
                    </button>
                  }
                >
                  <button
                    onClick={resetForm}
                    className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                  >
                    {t("common.reset")}
                  </button>
                </ClientOnly>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <ClientOnly
              fallback={
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Occupancy Cost Breakdown
                </h2>
              }
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {t("occupancyCosts.occupancyCostBreakdown")}
              </h2>
            </ClientOnly>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {breakdown && totalCosts !== null ? (
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <ClientOnly
                    fallback={
                      <h3 className="text-lg font-semibold text-orange-900 mb-2">
                        Total Occupancy Costs
                      </h3>
                    }
                  >
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">
                      {t("occupancyCosts.results.totalOccupancyCosts")}
                    </h3>
                  </ClientOnly>
                  <p className="text-3xl font-bold text-orange-600">
                    {formatCurrency(totalCosts)}
                  </p>
                </div>

                <div className="space-y-3">
                  {Object.entries(breakdown).map(([item, cost]) => (
                    <div
                      key={item}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                    >
                      <span className="text-sm text-gray-600">
                        {item === "Occupancy Fee"
                          ? t("occupancyCosts.results.occupancyFeeMonths", {
                              months: months,
                              plural: parseInt(months) > 1 ? "s" : "",
                            })
                          : item}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(cost)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>{t("common.note")}:</strong> {t("common.estimated")}
                  </p>
                </div>
              </div>
            ) : (
              <ClientOnly
                fallback={
                  <div className="text-center text-gray-500 py-8">
                    <p>
                      Enter your cost details and click Calculate to see
                      occupancy costs breakdown
                    </p>
                  </div>
                }
              >
                <div className="text-center text-gray-500 py-8">
                  <p>{t("occupancyCosts.enterDetails")}</p>
                </div>
              </ClientOnly>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { calculateClosingCostsAPI } from "../../utils/api";
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

export default function ClosingCostsCalculator() {
  const { t } = useTranslation();
  const [propertyPrice, setPropertyPrice] = useState("");
  const [hstAmount, setHstAmount] = useState("");
  const [hstRebated, setHstRebated] = useState(true);
  const [landTransferTax, setLandTransferTax] = useState("");
  const [devCharge, setDevCharge] = useState("");
  const [lawyerFee, setLawyerFee] = useState("");
  const [includeAgentCommission, setIncludeAgentCommission] = useState(false);
  const [agentCommission, setAgentCommission] = useState("");
  const [breakdown, setBreakdown] = useState<Record<string, number> | null>(
    null
  );
  const [totalCosts, setTotalCosts] = useState<number | null>(null);
  const [totalWithAgent, setTotalWithAgent] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateClosingCosts = async () => {
    setIsLoading(true);
    setError(null);

    const price = parseNumber(propertyPrice);
    const hst = parseNumber(hstAmount);
    const ltt = parseNumber(landTransferTax);
    const dev = parseNumber(devCharge);
    const lawyer = parseNumber(lawyerFee);

    // Input validation
    if (isNaN(price) || price <= 0) {
      setError(t("errors.validPropertyPrice"));
      setIsLoading(false);
      return;
    }

    if (isNaN(hst) || hst < 0) {
      setError(t("errors.validHstAmount"));
      setIsLoading(false);
      return;
    }

    if (isNaN(ltt) || ltt < 0) {
      setError(t("errors.validLandTransferTax"));
      setIsLoading(false);
      return;
    }

    if (isNaN(dev) || dev < 0) {
      setError(t("errors.validDevCharge"));
      setIsLoading(false);
      return;
    }

    if (isNaN(lawyer) || lawyer < 0) {
      setError(t("errors.validLawyerFee"));
      setIsLoading(false);
      return;
    }

    try {
      const response = await calculateClosingCostsAPI({
        propertyPrice: price,
        hstAmount: hst,
        hstRebated,
        landTransferTax: ltt,
        devCharge: dev,
        lawyerFee: lawyer,
        includeAgentCommission,
      });

      if (response.success && response.data) {
        const {
          basicClosingCosts,
          agentCommission,
          totalCosts: basicTotal,
          totalWithAgent: totalWithAgentResult,
        } = response.data;

        // Create breakdown for display
        const costBreakdown = {
          ...basicClosingCosts,
          "Agent Commission": agentCommission,
        };

        setBreakdown(costBreakdown);
        setTotalCosts(basicTotal);
        setTotalWithAgent(totalWithAgentResult);
      } else {
        setError(response.error || "Failed to calculate closing costs.");
      }
    } catch (error) {
      setError("Failed to connect to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setPropertyPrice("");
    setHstAmount("");
    setHstRebated(true);
    setLandTransferTax("");
    setDevCharge("");
    setLawyerFee("");
    setIncludeAgentCommission(false);
    setBreakdown(null);
    setTotalCosts(null);
    setTotalWithAgent(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            {t("common.backToHome")}
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t("closingCosts.title")}
          </h1>
          <p className="text-gray-600">{t("closingCosts.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 relative overflow-visible">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              {t("closingCosts.propertyDetails")}
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="propertyPrice"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("closingCosts.fields.propertyPrice")}
                </label>
                <input
                  type="text"
                  id="propertyPrice"
                  value={formatNumber(propertyPrice)}
                  onChange={(e) =>
                    setPropertyPrice(e.target.value.replace(/,/g, ""))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder={t("closingCosts.placeholders.propertyPrice")}
                />
              </div>

              <div>
                <label
                  htmlFor="hstAmount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("closingCosts.fields.hstAmount")}{" "}
                  {hstRebated && (
                    <span className="text-gray-500 text-xs">
                      {t("closingCosts.fields.hstNotApplicable")}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  id="hstAmount"
                  value={formatNumber(hstAmount)}
                  onChange={(e) =>
                    setHstAmount(e.target.value.replace(/,/g, ""))
                  }
                  disabled={hstRebated}
                  className={`w-full px-4 py-3 border rounded-xl text-gray-900 transition-all duration-200 ${
                    hstRebated
                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                      : "border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-400 hover:border-gray-300"
                  }`}
                  style={{
                    color: "#171717",
                    backgroundColor: hstRebated ? "#f9fafb" : "white",
                  }}
                  placeholder={
                    hstRebated
                      ? t("closingCosts.placeholders.notApplicable")
                      : t("closingCosts.placeholders.hstAmount")
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="hstRebated"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("closingCosts.fields.hstRebated")}
                </label>
                <select
                  id="hstRebated"
                  value={hstRebated ? "true" : "false"}
                  onChange={(e) => setHstRebated(e.target.value === "true")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-all duration-200 hover:border-gray-300 cursor-pointer"
                  style={{
                    color: "#171717",
                    backgroundColor: "white",
                  }}
                >
                  <option value="true">{t("closingCosts.options.yes")}</option>
                  <option value="false">{t("closingCosts.options.no")}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="landTransferTax"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("closingCosts.fields.landTransferTax")}
                </label>
                <input
                  type="text"
                  id="landTransferTax"
                  value={formatNumber(landTransferTax)}
                  onChange={(e) =>
                    setLandTransferTax(e.target.value.replace(/,/g, ""))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder={t("closingCosts.placeholders.landTransferTax")}
                />
              </div>

              <div>
                <label
                  htmlFor="devCharge"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("closingCosts.fields.devCharge")}
                </label>
                <input
                  type="text"
                  id="devCharge"
                  value={formatNumber(devCharge)}
                  onChange={(e) =>
                    setDevCharge(e.target.value.replace(/,/g, ""))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder={t("closingCosts.placeholders.devCharge")}
                />
              </div>

              <div>
                <label
                  htmlFor="lawyerFee"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("closingCosts.fields.lawyerFee")}
                </label>
                <input
                  type="text"
                  id="lawyerFee"
                  value={formatNumber(lawyerFee)}
                  onChange={(e) =>
                    setLawyerFee(e.target.value.replace(/,/g, ""))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder={t("closingCosts.placeholders.lawyerFee")}
                />
              </div>

              <div>
                <label
                  htmlFor="includeAgentCommission"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t("closingCosts.fields.includeAgentCommission")}
                </label>
                <select
                  id="includeAgentCommission"
                  value={includeAgentCommission ? "true" : "false"}
                  onChange={(e) =>
                    setIncludeAgentCommission(e.target.value === "true")
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-all duration-200 hover:border-gray-300 cursor-pointer"
                  style={{
                    color: "#171717",
                    backgroundColor: "white",
                  }}
                >
                  <option value="true">{t("closingCosts.options.yes")}</option>
                  <option value="false">{t("closingCosts.options.no")}</option>
                </select>
              </div>

              {includeAgentCommission && (
                <div>
                  <label
                    htmlFor="agentCommission"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Agent Commission (5% of Property Price)
                  </label>
                  <div className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed">
                    {propertyPrice
                      ? formatCurrency(parseNumber(propertyPrice) * 0.05)
                      : "$0"}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Automatically calculated as 5% of Property Price
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={calculateClosingCosts}
                  disabled={isLoading}
                  className={`flex-1 py-3 px-6 rounded-lg transition-colors font-medium ${
                    isLoading
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  }`}
                >
                  {isLoading ? t("common.calculating") : t("common.calculate")}
                </button>
                <button
                  onClick={resetForm}
                  disabled={isLoading}
                  className={`flex-1 py-3 px-6 rounded-lg transition-colors font-medium ${
                    isLoading
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-gray-500 text-white hover:bg-gray-600 cursor-pointer"
                  }`}
                >
                  {t("common.reset")}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              {t("closingCosts.closingCostsBreakdown")}
            </h2>

            {breakdown && totalCosts !== null ? (
              <div className="space-y-4">
                {/* Total without Agent Commission */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    {t("closingCosts.results.totalClosingCosts")}
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {formatCurrency(totalCosts)}
                  </p>
                </div>

                {/* Agent Commission included total */}
                {includeAgentCommission && totalWithAgent !== null && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                      {t("closingCosts.results.totalWithAgentCommission")}
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(totalWithAgent)}
                    </p>
                  </div>
                )}

                {/* Cash needed on closing day */}
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">
                    {t("closingCosts.results.totalCashNeeded")}
                  </h3>
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
                        {item === "Agent Commission"
                          ? t("closingCosts.results.agentCommissionIfSold")
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
              <div className="text-center text-gray-500 py-8">
                <p>{t("closingCosts.enterDetails")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

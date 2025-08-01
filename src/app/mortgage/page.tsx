"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { calculateMortgageAPI } from "../../utils/api";
import { ClientOnly } from "../../components/ClientOnly";
import { useLanguageStyles } from "../../utils/languageUtils";

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

export default function MortgageCalculator() {
  const { t } = useTranslation();
  const { koreanTextClass } = useLanguageStyles();
  const [propertyPrice, setPropertyPrice] = useState("");
  const [downPaymentPercent, setDownPaymentPercent] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [calculatedDownPayment, setCalculatedDownPayment] = useState<
    number | null
  >(null);
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateMortgage = async () => {
    setIsLoading(true);
    setError(null);

    const price = parseNumber(propertyPrice);
    const downPercent = parseFloat(downPaymentPercent);
    const rate = parseFloat(interestRate);

    // Input validation
    if (
      isNaN(price) ||
      isNaN(rate) ||
      isNaN(downPercent) ||
      price <= 0 ||
      rate <= 0 ||
      downPercent < 0 ||
      downPercent > 100
    ) {
      setError(t("errors.validDownPayment"));
      setIsLoading(false);
      return;
    }

    try {
      const response = await calculateMortgageAPI({
        propertyPrice: price,
        downPaymentPercent: downPercent,
        interestRate: rate,
      });

      if (response.success && response.data) {
        const {
          monthlyPayment: monthlyPaymentResult,
          downPayment,
          loanAmount: loanAmountResult,
        } = response.data;

        setMonthlyPayment(monthlyPaymentResult);
        setCalculatedDownPayment(downPayment);
        setLoanAmount(loanAmountResult);

        // For total calculations, assume 30 years (360 payments)
        const numberOfPayments = 30 * 12;
        const totalPaymentAmount = monthlyPaymentResult * numberOfPayments;
        setTotalPayment(totalPaymentAmount);
        setTotalInterest(totalPaymentAmount - loanAmountResult);
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
    setPropertyPrice("");
    setDownPaymentPercent("");
    setInterestRate("");
    setMonthlyPayment(null);
    setTotalPayment(null);
    setTotalInterest(null);
    setCalculatedDownPayment(null);
    setLoanAmount(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <ClientOnly
            fallback={
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
              >
                ← Back to Home
              </Link>
            }
          >
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              {t("common.backToHome")}
            </Link>
          </ClientOnly>
          <ClientOnly
            fallback={
              <>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Mortgage Calculator
                </h1>
                <p className="text-gray-600">
                  Calculate your monthly mortgage payment and total costs
                </p>
              </>
            }
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {t("mortgage.title")}
            </h1>
            <p className="text-gray-600">{t("mortgage.subtitle")}</p>
          </ClientOnly>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ClientOnly
              fallback={
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Input Details
                </h2>
              }
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {t("mortgage.inputDetails")}
              </h2>
            </ClientOnly>

            <div className="space-y-4">
              <div>
                <ClientOnly
                  fallback={
                    <label
                      htmlFor="propertyPrice"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Property Price
                    </label>
                  }
                >
                  <label
                    htmlFor="propertyPrice"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("mortgage.fields.propertyPrice")}
                  </label>
                </ClientOnly>
                <input
                  type="text"
                  id="propertyPrice"
                  value={formatNumber(propertyPrice)}
                  onChange={(e) =>
                    setPropertyPrice(e.target.value.replace(/,/g, ""))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder={t("mortgage.placeholders.propertyPrice")}
                />
              </div>

              <div>
                <ClientOnly
                  fallback={
                    <label
                      htmlFor="downPayment"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Down Payment (%)
                    </label>
                  }
                >
                  <label
                    htmlFor="downPayment"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("mortgage.fields.downPayment")}
                  </label>
                </ClientOnly>
                <input
                  type="number"
                  id="downPayment"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(e.target.value)}
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder={t("mortgage.placeholders.downPayment")}
                />
              </div>

              <div>
                <ClientOnly
                  fallback={
                    <label
                      htmlFor="interestRate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Interest Rate (%)
                    </label>
                  }
                >
                  <label
                    htmlFor="interestRate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("mortgage.fields.interestRate")}
                  </label>
                </ClientOnly>
                <input
                  type="number"
                  id="interestRate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  step="0.1"
                  min="0"
                  max="20"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder={t("mortgage.placeholders.interestRate")}
                />
              </div>

              <div className="flex space-x-4">
                <ClientOnly
                  fallback={
                    <button
                      onClick={calculateMortgage}
                      disabled={isLoading}
                      className="flex-1 bg-primary-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Calculating..." : "Calculate"}
                    </button>
                  }
                >
                  <button
                    onClick={calculateMortgage}
                    disabled={isLoading}
                    className="flex-1 bg-primary-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  }
                >
                  <button
                    onClick={resetForm}
                    className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors cursor-pointer"
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
                  Results
                </h2>
              }
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {t("mortgage.resultsTitle")}
              </h2>
            </ClientOnly>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {monthlyPayment !== null && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <ClientOnly
                    fallback={
                      <p className="text-sm text-blue-600 font-medium">
                        Monthly Payment
                      </p>
                    }
                  >
                    <p className="text-sm text-blue-600 font-medium">
                      {t("mortgage.results.monthlyPayment")}
                    </p>
                  </ClientOnly>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatCurrency(monthlyPayment)}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <ClientOnly
                    fallback={
                      <p className="text-sm text-green-600 font-medium">
                        Down Payment
                      </p>
                    }
                  >
                    <p className="text-sm text-green-600 font-medium">
                      {t("mortgage.results.downPayment")}
                    </p>
                  </ClientOnly>
                  <p className="text-2xl font-bold text-green-900">
                    {formatCurrency(calculatedDownPayment)}
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <ClientOnly
                    fallback={
                      <p className="text-sm text-purple-600 font-medium">
                        Loan Amount
                      </p>
                    }
                  >
                    <p className="text-sm text-purple-600 font-medium">
                      {t("mortgage.results.loanAmount")}
                    </p>
                  </ClientOnly>
                  <p className="text-2xl font-bold text-purple-900">
                    {formatCurrency(loanAmount)}
                  </p>
                </div>
              </div>
            )}

            {!monthlyPayment && !error && (
              <ClientOnly
                fallback={
                  <p className="text-gray-500 text-center py-8">
                    Enter your details and click Calculate to see results
                  </p>
                }
              >
                <p
                  className={`text-gray-500 text-center py-8 ${koreanTextClass}`}
                >
                  {t("mortgage.enterDetails")}
                </p>
              </ClientOnly>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

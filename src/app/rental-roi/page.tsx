"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
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

export default function RentalROICalculator() {
  const { t } = useTranslation();
  const [propertyPrice, setPropertyPrice] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [vacancyRate, setVacancyRate] = useState("");
  const [appreciationRate] = useState("3");
  const [results, setResults] = useState<{
    monthlyCashFlow: number;
    annualCashFlow: number;
    cashOnCashROI: number;
    capRate: number;
    totalROI: number;
  } | null>(null);

  const calculateROI = () => {
    const price = parseNumber(propertyPrice);
    const rent = parseNumber(monthlyRent);
    const down = parseNumber(downPayment);
    const rate = parseFloat(interestRate);
    const term = parseInt(loanTerm);
    const expenses = parseNumber(monthlyExpenses);
    const vacancy = parseFloat(vacancyRate);

    // Input validation
    if (
      isNaN(price) ||
      isNaN(rent) ||
      isNaN(down) ||
      isNaN(rate) ||
      isNaN(term) ||
      isNaN(expenses) ||
      isNaN(vacancy) ||
      price <= 0 ||
      rent <= 0 ||
      down < 0 ||
      rate <= 0 ||
      term <= 0 ||
      expenses < 0 ||
      vacancy < 0 ||
      vacancy > 100 ||
      down >= price
    ) {
      alert(
        "Please enter valid numbers for all fields. Down payment must be less than property price."
      );
      return;
    }

    const loanAmount = price - down;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;

    // Calculate monthly mortgage payment
    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / numberOfPayments;
    } else {
      monthlyPayment =
        (loanAmount *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    // Calculate vacancy-adjusted rent
    const adjustedRent = rent * (1 - vacancy / 100);

    // Calculate monthly cash flow
    const monthlyCashFlow = adjustedRent - monthlyPayment - expenses;

    // Calculate annual cash flow
    const annualCashFlow = monthlyCashFlow * 12;

    // Calculate cash-on-cash ROI
    const cashOnCashROI = (annualCashFlow / down) * 100;

    // Calculate cap rate
    const annualRent = rent * 12;
    const capRate = (annualRent / price) * 100;

    // Calculate total ROI (including appreciation)
    const appreciation = parseFloat(appreciationRate) / 100;
    const totalROI = cashOnCashROI + appreciation * 100;

    setResults({
      monthlyCashFlow,
      annualCashFlow,
      cashOnCashROI,
      capRate,
      totalROI,
    });
  };

  const resetForm = () => {
    setPropertyPrice("");
    setMonthlyRent("");
    setDownPayment("");
    setInterestRate("");
    setLoanTerm("30");
    setMonthlyExpenses("");
    setVacancyRate("");
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <ClientOnly
            fallback={
              <Link
                href="/"
                className="inline-flex items-center text-green-600 hover:text-green-800 mb-4"
              >
                ← Back to Home
              </Link>
            }
          >
            <Link
              href="/"
              className="inline-flex items-center text-green-600 hover:text-green-800 mb-4"
            >
              {t("common.backToHome")}
            </Link>
          </ClientOnly>
          <ClientOnly
            fallback={
              <>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Rental ROI Calculator
                </h1>
                <p className="text-gray-600">
                  Calculate your rental return on investment and cash flow
                  analysis
                </p>
              </>
            }
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {t("rentalROI.title")}
            </h1>
            <p className="text-gray-600">{t("rentalROI.subtitle")}</p>
          </ClientOnly>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ClientOnly
              fallback={
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Property Details
                </h2>
              }
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {t("rentalROI.propertyDetails")}
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
                    {t("rentalROI.fields.propertyPrice")}
                  </label>
                </ClientOnly>
                <input
                  type="text"
                  id="propertyPrice"
                  value={formatNumber(propertyPrice)}
                  onChange={(e) =>
                    setPropertyPrice(e.target.value.replace(/,/g, ""))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder="500,000"
                />
              </div>

              <div>
                <ClientOnly
                  fallback={
                    <label
                      htmlFor="monthlyRent"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Monthly Rent
                    </label>
                  }
                >
                  <label
                    htmlFor="monthlyRent"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("rentalROI.fields.monthlyRent")}
                  </label>
                </ClientOnly>
                <input
                  type="text"
                  id="monthlyRent"
                  value={formatNumber(monthlyRent)}
                  onChange={(e) =>
                    setMonthlyRent(e.target.value.replace(/,/g, ""))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder="3,000"
                />
              </div>

              <div>
                <ClientOnly
                  fallback={
                    <label
                      htmlFor="downPayment"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Down Payment
                    </label>
                  }
                >
                  <label
                    htmlFor="downPayment"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("rentalROI.fields.downPayment")}
                  </label>
                </ClientOnly>
                <input
                  type="text"
                  id="downPayment"
                  value={formatNumber(downPayment)}
                  onChange={(e) =>
                    setDownPayment(e.target.value.replace(/,/g, ""))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder="100,000"
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
                    {t("rentalROI.fields.interestRate")}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder="6.5"
                />
              </div>

              <div>
                <ClientOnly
                  fallback={
                    <label
                      htmlFor="loanTerm"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Loan Term (Years)
                    </label>
                  }
                >
                  <label
                    htmlFor="loanTerm"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("rentalROI.fields.loanTerm")}
                  </label>
                </ClientOnly>
                <select
                  id="loanTerm"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                  style={{ color: "#171717", backgroundColor: "white" }}
                >
                  <option value="15">15 Years</option>
                  <option value="20">20 Years</option>
                  <option value="25">25 Years</option>
                  <option value="30">30 Years</option>
                </select>
              </div>

              <div>
                <ClientOnly
                  fallback={
                    <label
                      htmlFor="monthlyExpenses"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Monthly Expenses
                    </label>
                  }
                >
                  <label
                    htmlFor="monthlyExpenses"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Monthly Expenses
                  </label>
                </ClientOnly>
                <input
                  type="text"
                  id="monthlyExpenses"
                  value={formatNumber(monthlyExpenses)}
                  onChange={(e) =>
                    setMonthlyExpenses(e.target.value.replace(/,/g, ""))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder="500"
                />
              </div>

              <div>
                <ClientOnly
                  fallback={
                    <label
                      htmlFor="vacancyRate"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Vacancy Rate (%)
                    </label>
                  }
                >
                  <label
                    htmlFor="vacancyRate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Vacancy Rate (%)
                  </label>
                </ClientOnly>
                <input
                  type="number"
                  id="vacancyRate"
                  value={vacancyRate}
                  onChange={(e) => setVacancyRate(e.target.value)}
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
                  style={{ color: "#171717", backgroundColor: "white" }}
                  placeholder="5"
                />
              </div>

              <div className="flex space-x-4">
                <ClientOnly
                  fallback={
                    <button
                      onClick={calculateROI}
                      className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      Calculate
                    </button>
                  }
                >
                  <button
                    onClick={calculateROI}
                    className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    {t("common.calculate")}
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
                  ROI Results
                </h2>
              }
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                ROI Results
              </h2>
            </ClientOnly>

            {results ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <ClientOnly
                    fallback={
                      <h3 className="text-lg font-semibold text-green-900 mb-2">
                        Monthly Cash Flow
                      </h3>
                    }
                  >
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                      Monthly Cash Flow
                    </h3>
                  </ClientOnly>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(results.monthlyCashFlow)}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <ClientOnly
                    fallback={
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        Annual Cash Flow
                      </h3>
                    }
                  >
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      Annual Cash Flow
                    </h3>
                  </ClientOnly>
                  <p className="text-3xl font-bold text-blue-600">
                    {formatCurrency(results.annualCashFlow)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <ClientOnly
                      fallback={
                        <h4 className="text-sm font-medium text-purple-600 mb-1">
                          Cash-on-Cash ROI
                        </h4>
                      }
                    >
                      <h4 className="text-sm font-medium text-purple-600 mb-1">
                        Cash-on-Cash ROI
                      </h4>
                    </ClientOnly>
                    <p className="text-lg font-semibold text-purple-900">
                      {results.cashOnCashROI.toFixed(2)}%
                    </p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <ClientOnly
                      fallback={
                        <h4 className="text-sm font-medium text-orange-600 mb-1">
                          Cap Rate
                        </h4>
                      }
                    >
                      <h4 className="text-sm font-medium text-orange-600 mb-1">
                        Cap Rate
                      </h4>
                    </ClientOnly>
                    <p className="text-lg font-semibold text-orange-900">
                      {results.capRate.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <ClientOnly
                    fallback={
                      <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                        Total ROI (with Appreciation)
                      </h3>
                    }
                  >
                    <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                      Total ROI (with Appreciation)
                    </h3>
                  </ClientOnly>
                  <p className="text-3xl font-bold text-yellow-600">
                    {results.totalROI.toFixed(2)}%
                  </p>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <ClientOnly
                    fallback={
                      <p className="text-sm text-gray-800">
                        <strong>Note:</strong> These are estimated returns.
                        Actual returns may vary based on market conditions and
                        property performance.
                      </p>
                    }
                  >
                    <p className="text-sm text-gray-800">
                      <strong>{t("common.note")}:</strong> These are estimated
                      returns. Actual returns may vary based on market
                      conditions and property performance.
                    </p>
                  </ClientOnly>
                </div>
              </div>
            ) : (
              <ClientOnly
                fallback={
                  <div className="text-center text-gray-500 py-8">
                    <p>
                      Enter your property details and click Calculate to see ROI
                      results
                    </p>
                  </div>
                }
              >
                <div className="text-center text-gray-500 py-8">
                  <p>
                    Enter your property details and click Calculate to see ROI
                    results
                  </p>
                </div>
              </ClientOnly>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ClientOnly } from "../components/ClientOnly";
import { useLanguageStyles } from "../utils/languageUtils";

export default function Home() {
  const { t } = useTranslation();
  const { koreanTextClass } = useLanguageStyles();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-primary-blue">
                Property Pilot
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <ClientOnly
                fallback={
                  <>
                    <Link
                      href="/mortgage"
                      className="text-gray-700 hover:text-primary-blue font-medium"
                    >
                      Mortgage
                    </Link>
                    <Link
                      href="/closing-costs"
                      className="text-gray-700 hover:text-primary-blue font-medium"
                    >
                      Closing Costs
                    </Link>
                    <Link
                      href="/occupancy-cost-calculator"
                      className="text-gray-700 hover:text-primary-blue font-medium"
                    >
                      Occupancy Costs
                    </Link>
                    <Link
                      href="/rental-roi"
                      className="text-gray-700 hover:text-primary-blue font-medium"
                    >
                      Rental ROI
                    </Link>
                  </>
                }
              >
                <Link
                  href="/mortgage"
                  className="text-gray-700 hover:text-primary-blue font-medium"
                >
                  {t("home.mortgage.title")}
                </Link>
                <Link
                  href="/closing-costs"
                  className="text-gray-700 hover:text-primary-blue font-medium"
                >
                  {t("home.closingCosts.title")}
                </Link>
                <Link
                  href="/occupancy-cost-calculator"
                  className="text-gray-700 hover:text-primary-blue font-medium"
                >
                  {t("home.occupancyCosts.title")}
                </Link>
                <Link
                  href="/rental-roi"
                  className="text-gray-700 hover:text-primary-blue font-medium"
                >
                  {t("home.rentalROI.title")}
                </Link>
              </ClientOnly>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <ClientOnly
            fallback={
              <>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Property Investment Calculators
                </h2>
                <p className="text-xl text-gray-100 max-w-3xl mx-auto font-medium">
                  Professional tools for property investment analysis
                </p>
              </>
            }
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              {t("home.title")}
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto font-medium">
              {t("home.subtitle")}
            </p>
          </ClientOnly>
        </div>

        {/* Advantages Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-16">
          <div className="text-center mb-12">
            <ClientOnly
              fallback={
                <>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Why Use Our Calculators?
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Professional tools designed to help you make better real
                    estate decisions
                  </p>
                </>
              }
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {t("home.advantages.title")}
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t("home.advantages.subtitle")}
              </p>
            </ClientOnly>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Instant Answers */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <ClientOnly
                fallback={
                  <>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Instant Answers
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Get quick results like mortgage payments and closing costs
                      without waiting for manual calculations.
                    </p>
                  </>
                }
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("home.advantages.instantAnswers.title")}
                </h4>
                <p className="text-gray-600 text-sm">
                  {t("home.advantages.instantAnswers.description")}
                </p>
              </ClientOnly>
            </div>

            {/* Better Decisions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <ClientOnly
                fallback={
                  <>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Better Decisions
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Compare different scenarios and feel confident making
                      informed choices about your real estate investments.
                    </p>
                  </>
                }
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("home.advantages.betterDecisions.title")}
                </h4>
                <p className="text-gray-600 text-sm">
                  {t("home.advantages.betterDecisions.description")}
                </p>
              </ClientOnly>
            </div>

            {/* 24/7 Convenience */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <ClientOnly
                fallback={
                  <>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      24/7 Convenience
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Access professional calculations anytime, anywhere. No
                      need to wait for business hours.
                    </p>
                  </>
                }
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("home.advantages.convenience.title")}
                </h4>
                <p className="text-gray-600 text-sm">
                  {t("home.advantages.convenience.description")}
                </p>
              </ClientOnly>
            </div>

            {/* Saves Time */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <ClientOnly
                fallback={
                  <>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Saves You Time
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Reduce repetitive questions and manual calculations, so
                      you can focus on high-value tasks.
                    </p>
                  </>
                }
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("home.advantages.savesTime.title")}
                </h4>
                <p className="text-gray-600 text-sm">
                  {t("home.advantages.savesTime.description")}
                </p>
              </ClientOnly>
            </div>

            {/* Generates Leads */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <ClientOnly
                fallback={
                  <>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Generates Leads
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Engaging tools capture interest and provide valuable
                      information for your business.
                    </p>
                  </>
                }
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("home.advantages.generatesLeads.title")}
                </h4>
                <p className="text-gray-600 text-sm">
                  {t("home.advantages.generatesLeads.description")}
                </p>
              </ClientOnly>
            </div>

            {/* Professional & Accurate */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <ClientOnly
                fallback={
                  <>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Professional & Accurate
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Industry-standard formulas and up-to-date rates build
                      trust and reduce calculation errors.
                    </p>
                  </>
                }
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("home.advantages.professional.title")}
                </h4>
                <p className="text-gray-600 text-sm">
                  {t("home.advantages.professional.description")}
                </p>
              </ClientOnly>
            </div>
          </div>
        </div>

        {/* Calculator Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Mortgage Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
            <div className="text-center mb-6 flex-grow">
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <ClientOnly
                fallback={
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Mortgage
                    </h3>
                    <p className="text-gray-600">
                      Calculate monthly mortgage payments and costs
                    </p>
                  </>
                }
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("home.mortgage.title")}
                </h3>
                <p className={`text-gray-600 ${koreanTextClass}`}>
                  {t("home.mortgage.description")}
                </p>
              </ClientOnly>
            </div>
            <ClientOnly
              fallback={
                <Link
                  href="/mortgage"
                  className="block w-full bg-primary-blue text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors mt-auto"
                  dangerouslySetInnerHTML={{ __html: "Calculate<br/>Mortgage" }}
                />
              }
            >
              <Link
                href="/mortgage"
                className="block w-full bg-primary-blue text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors mt-auto"
                dangerouslySetInnerHTML={{ __html: t("home.mortgage.button") }}
              />
            </ClientOnly>
          </div>

          {/* Closing Costs Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
            <div className="text-center mb-6 flex-grow">
              <div className="w-16 h-16 bg-accent-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <ClientOnly
                fallback={
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Closing Costs
                    </h3>
                    <p className="text-gray-600">
                      Calculate total closing costs for property purchase
                    </p>
                  </>
                }
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("home.closingCosts.title")}
                </h3>
                <p className={`text-gray-600 ${koreanTextClass}`}>
                  {t("home.closingCosts.description")}
                </p>
              </ClientOnly>
            </div>
            <ClientOnly
              fallback={
                <Link
                  href="/closing-costs"
                  className="block w-full bg-accent-purple text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors mt-auto"
                  dangerouslySetInnerHTML={{
                    __html: "Calculate Closing<br/>Costs",
                  }}
                />
              }
            >
              <Link
                href="/closing-costs"
                className="block w-full bg-accent-purple text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors mt-auto"
                dangerouslySetInnerHTML={{
                  __html: t("home.closingCosts.button"),
                }}
              />
            </ClientOnly>
          </div>

          {/* Occupancy Cost Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
            <div className="text-center mb-6 flex-grow">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <ClientOnly
                fallback={
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Occupancy Costs
                    </h3>
                    <p className="text-gray-600">
                      Calculate occupancy costs including lawyer fees
                    </p>
                  </>
                }
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("home.occupancyCosts.title")}
                </h3>
                <p className={`text-gray-600 ${koreanTextClass}`}>
                  {t("home.occupancyCosts.description")}
                </p>
              </ClientOnly>
            </div>
            <ClientOnly
              fallback={
                <Link
                  href="/occupancy-cost-calculator"
                  className="block w-full bg-orange-500 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors mt-auto"
                  dangerouslySetInnerHTML={{
                    __html: "Calculate<br/>Occupancy Costs",
                  }}
                />
              }
            >
              <Link
                href="/occupancy-cost-calculator"
                className="block w-full bg-orange-500 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors mt-auto"
                dangerouslySetInnerHTML={{
                  __html: t("home.occupancyCosts.button"),
                }}
              />
            </ClientOnly>
          </div>

          {/* Rental ROI Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
            <div className="text-center mb-6 flex-grow">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <ClientOnly
                fallback={
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Rental ROI
                    </h3>
                    <p className="text-gray-600">
                      Calculate rental return on investment
                    </p>
                  </>
                }
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("home.rentalROI.title")}
                </h3>
                <p className={`text-gray-600 ${koreanTextClass}`}>
                  {t("home.rentalROI.description")}
                </p>
              </ClientOnly>
            </div>
            <ClientOnly
              fallback={
                <Link
                  href="/rental-roi"
                  className="block w-full bg-green-500 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors mt-auto"
                  dangerouslySetInnerHTML={{
                    __html: "Calculate<br/>Rental ROI",
                  }}
                />
              }
            >
              <Link
                href="/rental-roi"
                className="block w-full bg-green-500 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors mt-auto"
                dangerouslySetInnerHTML={{ __html: t("home.rentalROI.button") }}
              />
            </ClientOnly>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2">
            <p>&copy; 2025 Maple Namu. All rights reserved.</p>
            <img
              src="/logo1.png"
              alt="Property Pilot Logo"
              className="h-10 w-auto"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

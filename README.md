# Property Pilot 🏠

A full-stack property investment calculator application built with Next.js, TypeScript, and Express.

## 🚀 Features

### Calculators

- **Closing Costs Calculator** - Calculate total closing costs for property purchase
- **Mortgage Calculator** - Calculate monthly mortgage payments and costs
- **Occupancy Costs Calculator** - Calculate occupancy costs including lawyer fees
- **Rental ROI Calculator** - Calculate rental return on investment

### Key Features

- Real-time calculations via API calls
- Multi-language support (English, French, Korean)
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Input validation and error handling

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React i18next** - Internationalization

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development

## 📁 Project Structure

```
property-pilot/
├── src/                          # Frontend (Next.js)
│   ├── app/                     # App Router pages
│   ├── components/              # React components
│   ├── i18n/                   # Internationalization
│   └── utils/                  # Utility functions
├── backend/                     # Backend (Express + TypeScript)
│   ├── src/
│   │   ├── controllers/        # API controllers
│   │   ├── types/             # TypeScript types
│   │   └── utils/             # Calculation utilities
│   └── package.json
├── .github/workflows/          # GitHub Actions
└── package.json
```

## 🔌 API Endpoints

| Method | Endpoint                         | Description                      |
| ------ | -------------------------------- | -------------------------------- |
| `POST` | `/api/calculate-closing-costs`   | Calculate property closing costs |
| `POST` | `/api/calculate-occupancy-costs` | Calculate occupancy costs        |
| `POST` | `/api/calculate-mortgage`        | Calculate mortgage payments      |
| `GET`  | `/api/health`                    | API health check                 |

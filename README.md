# 🌾 AgroPro

<div align="center">

**A modern, AI-powered agricultural management platform built by Team INDRA**

*Revolutionizing Farming with AI and Mechanization*

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [TIFAN Technology](#-tifan-technology)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Available Scripts](#-available-scripts)
- [Application Routes](#-application-routes)
- [UI & Theming](#-ui--theming)
- [API Integrations](#-api-integrations)
- [Team & Contact](#-team--contact)

---

## 🌱 About the Project

**AgroPro** is a comprehensive, AI-driven web platform designed to empower farmers and agricultural professionals with smart tools, real-time data, and actionable insights. Built by **Team INDRA** at Government College of Engineering, Karad (Maharashtra, India), AgroPro bridges the gap between modern technology and traditional farming practices.

The platform provides farmers with:
- Real-time weather forecasts with crop-specific advice
- AI-powered chatbot for instant agricultural guidance
- Smart crop cultivation calculators for optimized planting
- A centralized directory of government schemes and subsidies
- Seamless user authentication and profile management

---

## 🤖 TIFAN Technology

**TIFAN** (Team INDRA's Farming Automation Node) is the core innovation powering AgroPro — an innovative smart farming solution that integrates **advanced sensors**, **robotics**, and **artificial intelligence** to:

- ✅ Optimize crop yields
- ✅ Reduce water and fertilizer consumption
- ✅ Minimize labor costs through automation
- ✅ Provide real-time data and environmental insights
- ✅ Promote sustainable agricultural practices

> TIFAN was developed by a team of passionate students and mentors who collaborated to design a system combining cutting-edge technology with the practical realities of farming.

---

## ✨ Features

### ⛅ WeatherWise
Stay ahead of the weather with location-based forecasts and personalized farming tips.
- Enter any city name to get current weather conditions
- Displays temperature, humidity, wind speed, and weather description
- Provides **crop-specific farming tips** based on weather conditions (Clear, Clouds, Rain, Mist)
- Powered by the **OpenWeatherMap API**

### 🌱 GrowSmart — Crop Cultivation Calculator
Plan the optimal planting layout for your land to maximize yield using smart spacing methods.
- **Four planting methods supported:**
  | Method | Description |
  |---|---|
  | Square Grid Planting | Equal row and column spacing; ideal for symmetrical crops |
  | Rectangle Grid Planting | Different row and column spacing for varied crops |
  | Triangle Planting | Offset rows for ~15% higher density (0.866 spacing factor) |
  | Paired Row Planting | Alternating close and wide rows for airflow and access |
- Input land dimensions (length, width, border) with support for **cm, m, ft, and acres**
- Instantly calculates total plantable area and estimated plant count
- Visual diagrams for each planting method

### 🤖 AgroChat — AI Agricultural Assistant
An AI-powered chatbot that answers farming questions in real time.
- Powered by **Google Gemini 2.0 Flash** API
- Specialized in agriculture: crops, soil health, water management, pest control, and more
- Conversational chat UI with markdown-rendered responses
- Example questions to help users get started

### 📋 Schemes & Subsidies
Access a comprehensive, searchable directory of government and private agricultural schemes.
- Covers major Indian government schemes including:
  - Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
  - Pradhan Mantri Fasal Bima Yojana (PMFBY)
  - Soil Health Card Scheme
  - Animal Husbandry Infrastructure Development Fund (AHIDF)
  - And many more
- Search by scheme name, type, or organization
- Direct links to official scheme portals

### 🔐 Authentication
Secure user login and registration.
- Email and password authentication backed by a dedicated REST API
- Persistent sessions using HTTP-only cookies
- Password visibility toggle
- Loading states and agricultural-themed toast notifications

### 🌍 Multi-Language Support
Built-in **Google Translate** widget in the header allows users to translate the entire application into their preferred language, making it accessible to farmers across India.

---

## 🚀 Tech Stack

| Category | Technology | Version |
|---|---|---|
| **Framework** | React | 19.1.0 |
| **Build Tool** | Vite | 7.0.4 |
| **Styling** | Tailwind CSS | 4.1.11 |
| **Routing** | React Router DOM | 7.7.1 |
| **HTTP Client** | Axios | 1.11.0 |
| **Icons** | React Icons | 5.5.0 |
| **Notifications** | React Toastify | 11.0.5 |
| **Loading Spinners** | React Spinners | 0.17.0 |
| **Markdown Rendering** | React Markdown | 10.1.0 |
| **Linting** | ESLint | 9.30.1 |

---

## 📁 Project Structure

```
AgroPro/
├── public/                          # Static assets served at root
│   ├── planting-methods/            # Planting method diagrams
│   │   ├── paired-row.png
│   │   ├── rectangle-grid.png
│   │   ├── square-grid.png
│   │   └── triangle-planting.png
│   ├── weather-icons/               # Weather condition icons
│   │   ├── Clear.png
│   │   ├── Clouds.png
│   │   ├── error.png
│   │   ├── Mist.png
│   │   └── Rain.png
│   └── Team-Indra-Logo.png          # Team logo used in header
├── src/                             # Application source code
│   ├── assets/                      # Bundled static assets
│   │   └── Feature_Images/          # Feature card images
│   │       ├── AgroChat.png
│   │       ├── GrowSmart.png
│   │       ├── schemes.png
│   │       └── weather-wise.png
│   ├── components/                  # Reusable UI components
│   │   ├── formSteps/               # Multi-step TIFAN form steps
│   │   │   ├── Step1.jsx
│   │   │   ├── Step2.jsx
│   │   │   └── Step3.jsx
│   │   ├── Footer.jsx               # Site footer
│   │   ├── Header.jsx               # Navigation bar with theme toggle & Google Translate
│   │   ├── StickyButtons.jsx        # Floating action buttons
│   │   └── ToastStyles.css          # Custom agricultural toast styles
│   ├── data/                        # Static data
│   │   └── schemes.js               # Government schemes dataset
│   ├── features/                    # Feature page components
│   │   ├── GrowSmart.jsx            # Crop cultivation calculator
│   │   ├── MultiStepForm.jsx        # TIFAN multi-step input form
│   │   ├── Schemes.jsx              # Schemes listing with search
│   │   └── WeatherWise.jsx          # Weather dashboard
│   ├── Pages/                       # Route-level page components
│   │   ├── AboutTifan.jsx           # About TIFAN page
│   │   ├── Chatbot.jsx              # AgroChat AI assistant
│   │   ├── ContactUs.jsx            # Contact form & location map
│   │   ├── Features.jsx             # Feature discovery page
│   │   ├── Hero.jsx                 # Landing/home page
│   │   ├── Login.jsx                # User login
│   │   └── SignUp.jsx               # User registration
│   ├── App.jsx                      # Root component with routing
│   ├── index.css                    # Global styles (Tailwind directives)
│   └── main.jsx                     # Application entry point
├── .gitattributes
├── .gitignore
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML template with theme init script
├── package.json                     # Dependencies and scripts
├── package-lock.json
└── vite.config.js                   # Vite + Tailwind + React plugin config
```

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18 or higher recommended) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

Verify your installation:
```bash
node --version
npm --version
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ironhulk5226/AgroPro.git
   cd AgroPro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

### Environment Variables

The project currently uses API keys directly in the source code for development purposes. For a production deployment, it is strongly recommended to move these to environment variables.

Create a `.env` file in the project root:

```env
# OpenWeatherMap API Key (used in WeatherWise)
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key

# Google Gemini API Key (used in AgroChat)
VITE_GEMINI_API_KEY=your_google_gemini_api_key

# Backend Authentication API Base URL
VITE_AUTH_API_BASE_URL=https://your-backend-api-url.com
```

> **Note:** Variables must be prefixed with `VITE_` to be exposed to the Vite client bundle.

To obtain API keys:
- **OpenWeatherMap**: [openweathermap.org](https://openweathermap.org/api) — Free tier available
- **Google Gemini**: [Google AI Studio](https://aistudio.google.com/) — Free tier available

---

## 📦 Available Scripts

```bash
npm run dev       # Start development server (hot module replacement)
npm run build     # Build optimized production bundle to /dist
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint to check for code issues
```

---

## 🗺️ Application Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Hero` | Landing page with TIFAN introduction |
| `/login` | `Login` | User login page |
| `/signup` | `SignUp` | User registration page |
| `/features` | `Features` | Feature discovery page with search |
| `/about` | `AboutTifan` | About TIFAN and Team INDRA |
| `/contact` | `ContactUs` | Contact form and campus location |
| `/chatbot` | `Chatbot` | AgroChat AI assistant |
| `/weatherwise` | `WeatherWise` | Weather-based farming insights |
| `/growsmart` | `GrowSmart` | Crop cultivation calculator |
| `/schemes` | `Schemes` | Government schemes directory |
| `/form` | `MultiStepForm` | TIFAN multi-step input form |
| `*` | `Hero` | Fallback redirect to home |

---

## 🎨 UI & Theming

AgroPro features a fully responsive design with a **light/dark mode toggle** available in the navigation bar.

- **Light mode**: Clean white and green agricultural palette
- **Dark mode**: Dark gray backgrounds with vibrant green accents
- Theme preference is **persisted in `localStorage`** across sessions
- Smooth `200ms` CSS transitions throughout the UI
- Mobile-responsive layouts using Tailwind's responsive utilities
- Custom **agricultural-themed toast notifications** using React Toastify:
  - 🌱 Success messages
  - 🍂 Error messages
  - 🌾 Warning messages
  - 🌿 Informational messages

---

## 🔌 API Integrations

| Service | Purpose | Endpoint |
|---|---|---|
| **OpenWeatherMap** | Current weather data by city | `https://api.openweathermap.org/data/2.5/weather` |
| **Google Gemini 2.0 Flash** | AI-powered agricultural chatbot | `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent` |
| **Backend Auth API** | User login, registration, logout | `https://login-register-api-sn3f.onrender.com/api/user` |
| **Google Translate** | Full-page language translation | Injected via `translate.google.com` widget |

---

## 👥 Team & Contact

**AgroPro** was built by **Team INDRA** as part of the TIFAN smart farming initiative.

| | Details |
|---|---|
| 🏫 **Institution** | Government College of Engineering, Karad |
| 📍 **Location** | GCE Karad, Maharashtra, India |
| 📧 **Email** | [tifan25teamindra@gmail.com](mailto:tifan25teamindra@gmail.com) |
| 📞 **Phone** | +91 8108737426 |
| 🕐 **Office Hours** | Mon–Fri: 9:00 AM – 6:00 PM, Sat: 10:00 AM – 4:00 PM |

For bugs, feature requests, or general inquiries, please use the **Contact Us** page on the platform (`/contact`) or reach out via email.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please ensure your code follows the existing ESLint configuration by running `npm run lint` before submitting.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by <strong>Team INDRA</strong> — GCE Karad, Maharashtra, India</p>
  <p><em>Empowering farmers with technology, one harvest at a time. 🌾</em></p>
</div>
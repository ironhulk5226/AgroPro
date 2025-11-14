# AgroPro Frontend

A modern React-based agricultural management platform built with Vite and Tailwind CSS.

## 📁 Project Structure

```
FrontEnd/
├── public/                          # Static assets
│   ├── planting-methods/           # Planting method images
│   │   ├── paired-row.png
│   │   ├── rectangle-grid.png
│   │   ├── square-grid.png
│   │   └── triangle-planting.png
│   ├── weather-icons/              # Weather condition icons
│   │   ├── Clear.png
│   │   ├── Clouds.png
│   │   ├── error.png
│   │   ├── Mist.png
│   │   └── Rain.png
│   └── vite.svg
├── src/                            # Source code
│   ├── assets/                     # Application assets
│   │   ├── Feature_Images/         # Feature-related images
│   │   │   ├── AgroChat.png
│   │   │   ├── GrowSmart.png
│   │   │   ├── schemes.png
│   │   │   └── weather-wise.png
│   │   └── react.svg
│   ├── components/                 # Reusable components
│   │   ├── formSteps/             # Multi-step form components
│   │   │   ├── Step1.jsx
│   │   │   ├── Step2.jsx
│   │   │   └── Step3.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── StickyButtons.jsx
│   │   └── ToastStyles.css
│   ├── data/                      # Static data files
│   │   └── schemes.js
│   ├── features/                  # Feature-specific components
│   │   ├── GrowSmart.jsx
│   │   ├── MultiStepForm.jsx
│   │   ├── Schemes.jsx
│   │   └── WeatherWise.jsx
│   ├── Pages/                     # Page components
│   │   ├── AboutTifan.jsx
│   │   ├── Chatbot.jsx
│   │   ├── Features.jsx
│   │   ├── Hero.jsx
│   │   ├── Login.jsx
│   │   └── SignUp.jsx
│   ├── App.jsx                    # Main application component
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Application entry point
├── .env                           # Environment variables
├── .gitattributes                 # Git attributes configuration
├── .gitignore                     # Git ignore rules
├── eslint.config.js              # ESLint configuration
├── index.html                     # HTML template
├── package-lock.json             # Dependency lock file
├── package.json                   # Project dependencies and scripts
└── vite.config.js                # Vite configuration
```

## 🚀 Tech Stack

- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 4.1.11
- **Routing**: React Router DOM 7.7.1
- **HTTP Client**: Axios 1.11.0
- **Icons**: React Icons 5.5.0
- **Notifications**: React Toastify 11.0.5
- **Loading Spinners**: React Spinners 0.17.0
- **Markdown**: React Markdown 10.1.0

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🏗️ Architecture Overview

### Components Structure
- **Header**: Navigation with theme toggle and logout functionality
- **Footer**: Site footer component
- **StickyButtons**: Floating action buttons
- **FormSteps**: Multi-step form components for user input

### Features
- **GrowSmart**: Smart growing recommendations
- **WeatherWise**: Weather-based agricultural insights
- **Schemes**: Agricultural scheme information
- **MultiStepForm**: Progressive form for data collection

### Pages
- **Hero**: Landing page
- **Login/SignUp**: Authentication pages
- **Features**: Feature showcase
- **AboutTifan**: About page
- **Chatbot**: AI chat interface

## 🎨 Styling

The project uses Tailwind CSS with custom theming support including:
- Light/Dark mode toggle
- Agricultural-themed color palette
- Responsive design
- Custom toast notifications with agricultural icons

## 🔧 Development

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open browser at `http://localhost:5173`
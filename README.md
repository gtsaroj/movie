# Movie Application

A modern web application built with React, TypeScript, and Vite for browsing and discovering movies.

## Features

- Modern UI with responsive design
- Type-safe development with TypeScript
- Fast development with Vite
- Clean and maintainable code structure

## Project Structure

```
src/
├── assets/        # Static assets like images and fonts
├── components/    # Reusable UI components
├── common/        # Shared constants and utilities used across features
├── config/        # Application configuration
├── features/      # Feature-specific components and logic
├── helpers/       # Helper functions and utilities
├── hooks/         # Custom React hooks
├── layouts/       # Layout components
├── lib/          # Third-party library configurations
├── pages/        # Page components
├── routes/       # Route definitions
├── services/     # API services and data fetching
└── utils/        # Utility functions
```

### Directory Details

- **common/**: Contains shared resources used across multiple features:
  - Constants and configuration values
  - Common TypeScript interfaces and types
  - Shared utility functions
  - Common hooks and components
  - Shared styles and themes

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Technologies Used

- React
- TypeScript
- Vite
- ESLint
- Netlify (for deployment)

## License

[Your chosen license]

# API Configuration
VITE_APP_API_URL=https://yts.mx/api

# Application Settings
VITE_APP_NAME=Movie App Test
VITE_APP_VERSION=1.0.0



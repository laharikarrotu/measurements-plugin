# Window Measurements Plugin

A React-based plugin for tracking and managing window measurements.

## Features

- Form for capturing window measurements
- Support for different blind types and mechanisms
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/measurements-plugin.git
cd measurements-plugin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000.

## Usage

1. Fill out the window measurement form with the required details:
   - Room and window names
   - Blind type and model
   - Mount type and mechanism
   - Height and width measurements
   - Additional notes

2. Click "Save Measurement" to submit the form.

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint to check for code issues
- `npm run format` - Formats code using Prettier

### Project Structure

```
src/
  ├── components/         # React components
  ├── types/             # TypeScript type definitions
  ├── index.tsx          # Application entry point
  └── index.css          # Global styles
```

## License

This project is licensed under the ISC License. 
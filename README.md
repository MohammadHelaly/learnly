# Learnly

An online learning platform for students and teachers to create and purchase courses, developed using the MERN stack and Socket.io.

## Project Status

This is an older learning project and is currently on hold. The full product is not being actively maintained as a production service, and some backend-dependent flows may be unavailable or incomplete.

The repository remains available primarily as a frontend showcase and historical reference for the application UI, course flows, dashboards, and realtime learning experience concepts.

## Tech Stack

- React 18 and TypeScript for the frontend application UI.
- Create React App and `react-scripts` for local development, production builds, and testing.
- Material UI, Emotion, and custom CSS for styling and UI components.
- Framer Motion for page and interaction animations.
- React Router for client-side routing across public pages, auth pages, dashboards, course pages, and livestream rooms.
- React Hook Form and Zod for form state and validation.
- TanStack React Query and Axios for API requests, server state, and authenticated frontend data fetching.
- Node.js, Express, and MongoDB for the backend API.
- Mongoose for MongoDB schemas, models, validation, and data access.
- Socket.IO for realtime course channels, live chat, and livestream room events.
- PeerJS for peer-to-peer livestream and screen-sharing experiments.
- JWT, cookies, bcrypt, CORS, Helmet, rate limiting, and request sanitization middleware for authentication and API hardening.
- AWS SDK with S3-related upload flows for course, section, and user media.
- Nodemailer, Postmark transport, and EJS templates for transactional email flows.
- Mailchimp API integration for newsletter-related functionality.

## Project Structure

```text
|-- client/
|   |-- public/                 # CRA public assets and HTML template
|   |-- src/
|   |   |-- api/                # Axios client configuration
|   |   |-- assets/             # Static data and image assets
|   |   |-- components/         # Reusable UI sections, forms, guards, and page components
|   |   |-- hooks/              # Shared frontend hooks
|   |   |-- pages/              # Route-level page components
|   |   |-- store/              # Auth context and provider
|   |   |-- utils/              # Shared formatting and image utilities
|   |   |-- App.tsx             # Frontend route composition and app shell
|   |   `-- index.tsx           # React entry point
|   |-- package.json
|   `-- tsconfig.json
|-- server/
|   |-- controllers/            # Express route handlers and controller logic
|   |-- models/                 # Mongoose models for users, courses, sections, reviews, etc.
|   |-- routes/                 # API route definitions
|   |-- utils/                  # API helpers, error handling, email, and async wrappers
|   |-- views/email/            # EJS email templates
|   |-- app.js                  # Express app configuration and middleware
|   |-- server.js               # MongoDB connection, HTTP server, and Socket.IO setup
|   `-- package.json
|-- README.md
`-- LICENSE
```

## Prerequisites

- Node.js 18 or newer.
- npm. Both `client` and `server` include `package-lock.json` files, so npm is the expected package manager.
- A local MongoDB installation for local development. The original development setup expected MongoDB to be installed and running on each developer machine.
- Optional service credentials are needed for full backend functionality, including S3 uploads, email, Mailchimp, and any deployed database/API environments.

## Environment Variables

The project uses separate environment files for the frontend and backend.

Create `client/.env` when running the frontend locally:

```env
REACT_APP_API_URL_LOCAL=http://localhost:5000/api/v1
REACT_APP_API_URL=<your-production-api-url>/api/v1
REACT_APP_BACKEND_URL_LOCAL=http://localhost:5000
REACT_APP_BACKEND_URL=<your-production-backend-url>
REACT_APP_PEERJS_PORT=<peerjs-port>
```

Create `server/.env` when running the backend locally:

```env
NODE_ENV=development
PORT=5000
DATABASE_LOCAL=mongodb://127.0.0.1:27017/learnly
DATABASE=<your-mongodb-atlas-uri-with-password-placeholder>
DATABASE_PASSWORD=<your-mongodb-atlas-password>

FRONTEND_URL_LOCAL=http://localhost:3000
FRONTEND_URL=<your-production-frontend-url>

JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
AWS_REGION=<your-aws-region>
S3_BUCKET_NAME=<your-s3-bucket-name>

EMAIL_FROM=<your-development-email-from>
EMAIL_FROM_PROD=<your-production-email-from>
EMAIL_HOST=<your-development-email-host>
EMAIL_PORT=<your-development-email-port>
EMAIL_USERNAME=<your-development-email-username>
EMAIL_PASSWORD=<your-development-email-password>
POSTMARK_APIKEY=<your-postmark-api-key>

MAILCHIMP_API_KEY=<your-mailchimp-api-key>
MAILCHIMP_AUDIENCE=<your-mailchimp-audience-id>
```

The frontend can render many static pages without every backend integration configured, but authenticated flows, course management, uploads, chat, livestream features, and email/newsletter actions depend on the relevant backend services.

## Runbook

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

Start MongoDB locally before running the backend. The original local setup expected `DATABASE_LOCAL` to point to a MongoDB instance running on the developer machine.

Start the backend API and Socket.IO server:

```bash
cd server
npm start
```

By default, the backend runs at `http://localhost:5000`.

Start the frontend development server:

```bash
cd client
npm start
```

By default, Create React App serves the frontend at `http://localhost:3000`.

Build the frontend production bundle:

```bash
cd client
npm run build
```

Run the frontend test runner:

```bash
cd client
npm test
```

The backend `npm test` script is still the default placeholder and exits with an error. There is no root-level npm workspace or shared run script, so the frontend and backend are managed from their own folders.

## Deployment

The latest hosted setup uses Vercel for the frontend, Railway for the backend, and MongoDB Atlas for the hosted database.

The deployed environment depends on production values for the frontend API URLs, backend CORS origin, MongoDB Atlas connection string, JWT settings, and any optional third-party services used by uploads, emails, newsletters, or realtime features.

Because the project is on hold, the deployed application should be treated as a portfolio/demo surface rather than a fully supported production platform.

## Development Notes

- The frontend is an older Create React App setup, not Vite.
- The backend and frontend are installed and run separately from `server/` and `client/`.
- The API base URL is configured in `client/src/api/index.ts` from `REACT_APP_API_URL_LOCAL` or `REACT_APP_API_URL`.
- Socket.IO and livestream-related components use `REACT_APP_BACKEND_URL_LOCAL`, `REACT_APP_BACKEND_URL`, and `REACT_APP_PEERJS_PORT`.
- The Express app exposes versioned REST routes under `/api/v1`.
- MongoDB connection logic lives in `server/server.js`, and Express middleware/route setup lives in `server/app.js`.
- Some implementation details reflect the project's early-stage learning context and may need refactoring before any future production revival.

## License

This project is licensed under the MIT License. See `LICENSE` for details.

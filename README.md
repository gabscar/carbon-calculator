# Carbon Calculator

A simplified carbon footprint calculator.

> **Disclaimer:** This is a simplified calculator and should **not** be used for professional or scientific carbon emission measurements. It is intended for educational and demonstrational purposes only.

## Project Structure

The project is a monorepo containing two main parts:

-   `./api`: The backend API built with Node.js and TypeScript.
-   `./front`: The frontend application built in React with TypeScript.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (v20.x or later recommended)
-   npm (usually comes with Node.js)
-   Docker
-   Docker Compose

## Getting Started

Follow these steps to get your development environment set up.

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd carbon-calculator-2
```

### 2. Install Dependencies

Install the dependencies for both the `api` and `front` projects with a single command:

```bash
npm run install:all
```

### 3. Environment Variables

This project uses environment variables for configuration. Copy the example file to create your own local configuration:

```bash
cp .env.example .env
```

Now, open the `.env` file and fill in the required values (like `PORT`, `VITE_API_URL`, etc.).

---

## Running in Development Mode

To run both the frontend and backend servers simultaneously with hot-reloading, use the following command:

```bash
npm run dev
```

This will:
-   Start the backend API (typically on `http://localhost:3001`).
-   Start the frontend development server.

---

## Running for Production with Docker
# Example for a PostgreSQL database. Replace with your actual connection string.
DATABASE_URL=postgresql://user:password@db_host:5432/mydatabase
JWT_SECRET=your-super-secret-jwt-key
For production deployment, we use Docker and Docker Compose to build and run the application in isolated containers.

### Building and Running

Ensure your `.env` file is correctly configured, then run:

```bash
npm run deploy
```

This command will build the production-ready Docker images for both the `api` and `front` services and start them in the background.

### Accessing the Application

-   **Frontend**: The application will be available at `http://localhost:8080`.
-   **API**: The API is proxied through the frontend's web server (Nginx). Any request from the app to `/api` will be automatically routed to the API service. For direct testing with tools like Postman, the API is also accessible at `http://localhost:3001`.

### Stopping the Containers

To stop and remove the running containers, use:

```bash
npm run deploy:down
```
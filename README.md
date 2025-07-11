# Carbon Calculator Monorepo
> **Disclaimer:** This project is made in monorepo only to make more easy to evaluate both front and backend.


This repository contains the code for a full-stack Carbon Footprint Calculator, including both the frontend (React + MUI) and backend (Node.js + Express + TypeScript).

## Project Structure

- [Frontend (React)](./front/README.md)
- [Backend (API)](./api/README.md)

## Instructions to run front and backend together 

Follow these steps to get your development environment set up.

### 1. Clone the repository

```bash
git clone git@github.com:gabscar/carbon-calculator.git
cd carbon-calculator-2
```

### 2. Install Dependencies

Install the dependencies for both the `api` and `front` projects with a single command:

```bash
npm install
```

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
-   Start the backend API (typically on `http://localhost:3333`).
-   Start the frontend development server (`http://localhost:5173`).

---

## Running for Production with Docker

For production deployment, we use Docker and Docker Compose to build and run the application in isolated containers.

### Building and Running

Ensure your `.env` file is correctly configured, then run:

```bash
npm run deploy
```

This command will build the production-ready Docker images for both the `api` and `front` services and start them in the background.

### Accessing the Application

-   **Frontend**: The application will be available at `http://localhost:8080`.
-   **API**: The API is proxied through the frontend's web server (Nginx). Any request from the app to `/api` will be automatically routed to the API service. For direct testing with tools like Postman, the API is also accessible at selected port, the default is `http://localhost:3333`.

### Stopping the Containers

To stop and remove the running containers, use:

```bash
npm run deploy:down
```

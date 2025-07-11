# Carbon Calculator API

This is the backend API for the Carbon Footprint Calculator project. It is built with Node.js, Express, and TypeScript.

The project follows the **Clean Architecture** pattern and is organized into four main layers:

- **domain**: Business interfaces and domain entities.
- **infra**: Database connections and external service interfaces.
- **interface**: HTTP routes and controllers.
- **usecases**: Implementations of all use cases.


## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Start the server:
   ```bash
   npm start
   ```
## API Documentarion

A full interactive API documentation (Swagger) is available at:

 ```
    /api/docs
 ```
 It provides detailed information about all endpoints, request/response formats, status codes, and example payloads.

## Main Route

### POST `/api/calculate-carbon`

Calculates the user's carbon footprint based on the provided data.

#### Request Body (JSON)
```
{
  "transportation": [
    { "type": "car", "distance": 100, "isMantainance": true }
  ],
  "energy": {
    "electricity": 200,
    "natural_gas": 10,
    "fuel_oil": 0,
    "propane": 0
  },
  "waste": {
    "recycle_paper": true,
    "recycle_plastic": false,
    "recycle_metal": true,
    "no_recycling": false
  },
  "persons": 1
}
```

#### Response (JSON)
```
{
  "transportationEmissions": 44.85,
  "energyEmissions": 133,
  "wasteEmissions": -0.03,
  "dietEmissions": 208.33,
  "totalEmissions": 386.15,
  "unit": "kg CO2e"
}
```

- `transportationEmissions`, `energyEmissions`, `wasteEmissions`, `dietEmissions`, and `totalEmissions` are all in kilograms of CO₂ equivalent.
- `unit` is always `kg CO2e`.

---

For more details, see the code in the `src/infra/controllers/api/carbonCalculatorController.ts` file. 
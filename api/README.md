# Carbon Calculator API

This is the backend API for the Carbon Footprint Calculator project. It is built with Node.js, Express, and TypeScript.

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

## Main Route

### POST `/api/calculate`

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
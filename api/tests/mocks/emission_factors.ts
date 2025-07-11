export const mockedEmissionFactors = {
    "transportation": {
        "car": {
            "unit": "mile",
            "emission_factor": 0.404,
            "description": "Carro de passeio médio a gasolina, kg CO2e por milha"
        },
        "bus": {
            "unit": "mile",
            "emission_factor": 0.089,
            "description": "Ônibus urbano, kg CO2e por milha"
        },
        "train": {
            "unit": "mile",
            "emission_factor": 0.045,
            "description": "Transporte ferroviário, kg CO2e por milha"
        },
        "airplane_short": {
            "unit": "mile",
            "emission_factor": 0.255,
            "description": "Voo doméstico curto, kg CO2e por milha"
        },
        "airplane_long": {
            "unit": "mile",
            "emission_factor": 0.156,
            "description": "Voo internacional longo, kg CO2e por milha"
        }
    },
    "energy": {
        "electricity": {
            "unit": "kWh",
            "emission_factor": 0.4,
            "description": "Consumo médio de eletricidade nos EUA, kg CO2e por kWh"
        },
        "natural_gas": {
            "unit": "therm",
            "emission_factor": 5.3,
            "description": "Gás natural residencial, kg CO2e por therm"
        },
        "fuel_oil": {
            "unit": "gallon",
            "emission_factor": 10.21,
            "description": "Óleo combustível residencial, kg CO2e por galão"
        },
        "propane": {
            "unit": "gallon",
            "emission_factor": 5.75,
            "description": "Propano residencial, kg CO2e por galão"
        }
    },
    "waste": {
        "recycle_paper": {
            "unit": "boolean",
            "emission_factor": -0.19,
            "description": "Reciclagem de papel, redução de CO2e por pessoa por ano"
        },
        "recycle_plastic": {
            "unit": "boolean",
            "emission_factor": -0.16,
            "description": "Reciclagem de plástico, redução de CO2e por pessoa por ano"
        },
        "recycle_metal": {
            "unit": "boolean",
            "emission_factor": -0.18,
            "description": "Reciclagem de metal, redução de CO2e por pessoa por ano"
        },
        "no_recycling": {
            "unit": "person",
            "emission_factor": 0.69,
            "description": "Pessoa que não recicla, kg CO2e emitido por ano"
        }
    },
}
import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node.js API",
            version: "1.0.0",
            description: "A simple Express API",
        },
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-auth-token",
                    description: "Custom API key header for JWT",
                },
            },
            schemas: {
                Car: {
                    type: "object",
                    required: [
                        "automaker", "model", "year",
                        "bodyStyle", "price", "colour",
                        "engineType", "transmission", "mileage",
                        "seatingCapacity", "image"
                    ],
                    properties: {
                        id: {
                            type: "string",
                            description: "Car ID",
                        },
                        automaker: {
                            type: "string",
                            description: "Automaker ID",
                        },
                        model: {
                            type: "string",
                            description: "Car model",
                        },
                        year: {
                            type: "number",
                            description: "Car's year of manufacture"
                        },
                        bodyStyle: {
                            type: "string",
                            description: "Body style of the car, e.g. sedan or hatchback, etc"
                        },
                        price: {
                            type: "number",
                            description: "Car price"
                        },
                        colour: {
                            type: "string",
                            description: "Car colour"
                        },
                        engineType: {
                            type: "string",
                            description: "Car engine type"
                        },
                        transmission: {
                            type: "string",
                            description: "Car transmission type, e.g. Manual or Automatic"
                        },
                        mileage: {
                            type: "number",
                            description: "The distance in kilometers that previous owner drove the car"
                        },
                        seatingCapacity: {
                            type: "number",
                            description: "The number of people including the driver can accommodate inside the car"
                        },
                        image: {
                            type: "string",
                            description: "The path to the image of the car"
                        }
                    },
                },
                Automaker: {
                    type: "object",
                    required: ["name"],
                    properties: {
                        id: {
                            type: "string",
                            description: "Automaker ID",
                        },
                        name: {
                            type: "string",
                            description: "Automaker name",
                        },
                    },
                },
            },
        },
        security: [
            {
                ApiKeyAuth: [],
            },
        ],
    },
    apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
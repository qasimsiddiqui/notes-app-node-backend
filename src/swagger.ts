import swagger from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Notes app API with Swagger",
    version: "1.0.0",
    description: "A nodejs api for notes app.",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [],
};

export const swaggerSpec = swagger(options);

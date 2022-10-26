import swagger from "swagger-jsdoc";

const swaggerDefinition: swagger.OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Notes app API with Swagger",
    version: "1.0.0",
    description: "A nodejs api for notes app.",
  },
  servers: [
    {
      url: "http://localhost:4000/v1/api",
      description: "Development server",
    },
  ],

  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options: swagger.OAS3Options = {
  definition: swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
    "./src/utils/swagger.components.ts",
    "./src/notes/notes.swagger.yaml",
    "./src/comments/comments.swagger.yaml",
    "./src/notifications/notifications.swagger.yaml",
    "./src/users/users.swagger.yaml",
  ],
};

export const swaggerSpec = swagger(options);

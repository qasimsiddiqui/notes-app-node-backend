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
    "./src/notes/notes.routes.ts",
    "./src/notes/model/notes.interface.ts",
    "./src/utils/swagger.components.ts",
    "./src/comments/commentRoutes.ts",
    "./src/comments/model/comment.model.ts",
  ],
};

export const swaggerSpec = swagger(options);

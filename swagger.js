import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentação da Lume Reports API",
      version: "1.0.0",
      description: "API responsável por gerar relatórios detalhados de desempenho, acessibilidade, SEO e outros indicadores de páginas da web usando o Lighthouse.",
    },
  },
  apis: ["./server.js"],
};

const specs = swaggerJsdoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

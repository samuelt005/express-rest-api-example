import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "API Documentation",
    description: "This is the API documentation for the application."
  },
  servers: [
    {
      url: "http://localhost:4040"
    }
  ],
  components: {
    schemas: {

    }
  }
};

const outputFile = "./config/swagger.json";
const endpointFiles = ["./routes.js"];

swaggerAutogen({openapi: "3.0.0" })(outputFile, endpointFiles, doc)
  .then(async () => {
    await import("./server.js");
  });

import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "API Documentation",
    description: "This is the API documentation for the application."
  },
  servers: [
    {
      url: "http://localhost:8001"
    }
  ],
  components: {
    schemas: {
      NotFound: {
        code: "404",
        message: "",
      },
      InternalServerError: {
        code: "500",
        message: "",
      },
      PaymentRequired: {
        code: "402",
        message: "",
      },
      Page: {
        current: 1,
        total: 1,
        size: 10
      },
      HateoasLink: {
        rel: "rel",
        href: "/api/endpoint",
        method: "METHOD"
      },
      User: {
        _id: "_id",
        name: "username",
        email: "example@email.com",
        password: "abcd1234",
        createdAt: "2025-01-01T01:00:00.000Z",
        updatedAt: "2025-01-01T01:00:00.000Z",
        _links: [
          {$ref: "#/components/schemas/HateoasLink"}
        ]
      },
      CreateOrUpdateUser: {
        name: "username",
        email: "example@email.com",
        password: "abcd1234"
      },
      Product: {
        _id: "_id",
        name: "product name",
        description: "product description",
        price: 100.00,
        createdAt: "2025-01-01T01:00:00.000Z",
        updatedAt: "2025-01-01T01:00:00.000Z",
        _links: [
          {$ref: "#/components/schemas/HateoasLink"}
        ]
      },
    }
  }
};

const outputFile = "./config/swagger.json";
const endpointFiles = ["./routes.js"];

swaggerAutogen({openapi: "3.0.0"})(outputFile, endpointFiles, doc)
  .then(async () => {
    await import("./server.js");
  });

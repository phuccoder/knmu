// filepath: d:\knmu\swagger.js
import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "Express API with Swagger",
        description: "This is a simple CRUD API application made with Express.",
    },
    host: "localhost:8000",
    schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/routes/*.js"];


swaggerAutogen()(outputFile, endpointsFiles, doc);
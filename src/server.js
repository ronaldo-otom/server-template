import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routes from "./modules/routes.js";

dotenv.config();

class Application {
  constructor(port, authService, routes) {
    this.port = port;
    this.app = express();
    this.authService = authService;
    this.routes = routes;
    this.db = null;
  }

  async configureMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(function (err, req, res, next) {
      if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
      }

      return res.status(500).json(err);
    });

    try {
      // Connect to MongoDB
      const uri =
        "mongodb+srv://ronix:W0Qj9MSt6I6Ap24P@ronixproject.ihefc.mongodb.net/breederdao"; // Update with your MongoDB URI
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
    }
  }

  configureRoutes() {
    for (const route of this.routes) {
      route(this.app);
    }
  }

  start() {
    this.configureMiddlewares();
    this.configureRoutes();

    this.app.listen(this.port, () =>
      console.log(`Server running on port: http://localhost:${this.port}`)
    );
  }
}

const port = 3001;
const Server = new Application(port, null, routes);

// Start the server
Server.start();

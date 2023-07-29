import { Router } from "express";
import { Joi, validate } from "express-validation";
import AuthController from "./auth.controller.js";
const router = Router();

export default (app) => {
  app.use("/auth", router);

  router.post(
    "/register",
    validate({
      body: Joi.object({
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
      }),
    }),
    AuthController.Register
  );

  // router.post(
  //   "/login",
  //   validate({
  //     body: Joi.object({
  //       username: Joi.string().required().label("Username"),
  //       password: Joi.string().required().label("Password"),
  //     }),
  //   }),
  //   authController.Login
  // );
};

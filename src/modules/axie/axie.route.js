import { Router } from "express";
import { Joi, validate } from "express-validation";
import verifyAuth from "../../middlewares/verifyAuth.js";
import { AxieController } from "./axie.controller.js";
const router = Router();

export default (app) => {
  app.use("/axies", verifyAuth, router);

  const axieController = new AxieController();

  router.post("/store-records", axieController.FetchAxiesFromOtherSource);

  router.get("/get-all", axieController.getAllAxiesFromDB);

  router.post(
    "/add",
    validate({
      body: Joi.object({
        axie_id: Joi.string().required().label("Axie ID"),
        name: Joi.string().label("Name"),
        stage: Joi.number().required().label("Stage"),
        class: Joi.string().required().label("Class"),
        current_price: Joi.number().required().label("Current Price"),
      }),
    }),
    axieController.addAxie
  );
};

import express from "express";
import TemperaturesController from "../controllers/temperatures.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";

class TemperaturesRoutes {
    constructor() {
        this.router = express.Router();
        this.controller = new TemperaturesController();
    }

    start() {
        this.router.get("/temperatures/all", this.controller.getAllTemperatures);

        this.router.get("/temperatures/range", validationMiddleware.validateRange, this.controller.getTempsRange);

        this.router.post("/temperatures", validationMiddleware.validateMagnitude, validationMiddleware.validateUnit, this.controller.postTemperatures);
        // this.router.post("/temperatures", this.controller.postTemperatures);

        this.router.delete("/temperatures/delete/:identifier", this.controller.deleteTemperatures);

        return this.router;
    }
}

export default TemperaturesRoutes;
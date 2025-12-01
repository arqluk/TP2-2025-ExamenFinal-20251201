import express from "express";
import RunnersController from "../controllers/runners.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";

class RunnersRoutes {
    constructor() {
        this.router = express.Router();
        this.controller = new RunnersController();
    }

    start() {
        this.router.get("/runners", this.controller.getAllRunners);

        this.router.post("/runners", validationMiddleware.validateId, validationMiddleware.validateCoordinates, this.controller.postRunners);
        // this.router.post("/runners", this.controller.postRunners);

        this.router.delete("/runners/delete/:identifier", this.controller.deleteRunners);

        return this.router;
    }
}

export default RunnersRoutes;
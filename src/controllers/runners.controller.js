import RunnersService from "../services/runners.service.js";

class RunnersController {
    constructor() {
        this.service = new RunnersService();
    }

    getAllRunners = async (req, res) => {
        const runners = await this.service.getAllRunners();
        try {
            res.status(200).json({
                status: "Success",
                message: "Ok.",
                data: runners,
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                data: error,
            });
        }
    };

    postRunners = async (req, res) => {
        const runner = req.body
        const newRunner = await this.service.postRunners(runner);
        try {
            res.status(200).json({
                status: "Success",
                message: "Runner added ok",
                data: newRunner,
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                data: error,
            });
        }
    };

    //  postEntities = async (req, res) => {
    //     const entity = req.body
    //     if( JSON.stringify(req.body) == "{}") {
    //     throw new Error("La entidad no tiene los parámetros válidos")
    // }
    //     const newEntity = await this.service.postEntities(entity)
    //     res.send(newEntity)
    // }

    deleteRunners = async (req, res) => {
        const { identifier } = req.params;
        const removedRunner = await this.service.deleteRunners(identifier);
        try {
            res.status(200).json({
                status: "Success",
                message: removedRunner,
            });
        } catch (error) {
            res.status(500).json({
                status: "Error",
                data: error,
            });
        }
    };

}

export default RunnersController;

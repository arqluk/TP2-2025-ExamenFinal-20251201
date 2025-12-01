import TemperaturesService from "../services/temperatures.service.js";

class TemperaturesController {
    constructor() {
        this.service = new TemperaturesService();
    }

    getAllTemperatures = async (req, res) => {
        const temperatures = await this.service.getAllTemperatures();
        try {
            // res.status(200).json({
            //     status: "Success",
            //     message: "Ok.",
            //     data: temperatures,
            // });
            res.status(200).json(
                temperatures
            );
        } catch (error) {
            res.status(500).json({
                status: "error",
                data: error,
            });
        }
    };

    getTempsRange = async (req, res) => {
        try {
            const { min, max } = req.query;

            if (min === undefined || max === undefined) {
            return res.status(400).json({
                error: "Debe enviar min y max"
            });
        }
        const range = {
            min: Number(min),
            max: Number(max)
        };
            const tempsRange = await this.service.getTempsRange(req.range);
            // res.status(200).json({
            //     status: "Success",
            //     message: "Ok.",
            //     data: temperatures,
            // });
            return res.status(200).json({
                message: "success",
                temperatures: tempsRange
        });
        } catch (error) {
            console.error("Error inesperado en getTempsRange:", error)
            res.status(500).json({
                error: "internal error",
                message: "Error interno del servidor",
            });
        }
    };

    postTemperatures = async (req, res) => {
        const temperature = req.body
        try {
            const newTemperature = await this.service.postTemperatures(temperature);
            res.status(200).json({ message: "temperature added ok", newTemperature })
        } catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    };

    // deleteTemperatures = async (req, res) => {
    //     const { identifier } = req.params;
    //     const removedTemperature = await this.service.deleteTemperatures(identifier);
    //     try {
    //         res.status(200).json({
    //             status: "Success",
    //             message: removedTemperature,
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             status: "Error",
    //             message: removedTemperature,
    //             // data: error,
    //         });
    //     }
    // };

    deleteTemperatures = async (req, res) => {
        const { identifier } = req.params;
        try {
            const removedTemperature = await this.service.deleteTemperatures(identifier);
            // devolver el objeto eliminado con 200
            return res.status(200).json({
                message: "temperature removed ok",
                removed: removedTemperature
            });
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({
                    // error: error.code || "error",
                    message: error.message || "Ha ocurrido un error"
                });
            }
            // Error inesperado
            console.error("Error inesperado en deleteTemperatures:", error);
            return res.status(500).json({
                error: "internal_error",
                message: "Error interno del servidor"
            });
        }
    };
    
}

export default TemperaturesController;

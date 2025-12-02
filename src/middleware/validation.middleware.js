import Joi from "joi";

const validateId = (req, res, next) => {
    const runnerIdSchema = Joi.object({
        id: Joi.string()
            .pattern(/^[A-Z]{3}\d{3}$/)
            .required()
    });

    const { error } = runnerIdSchema.validate({ id: req.body.id });

    if (error) {
        return res.status(400).json({
            error: `El id debe ser un valor alfanumérico del tipo COR123.`
        });
    }

    next();
};

const validateCoordinates = (req, res, next) => {
    const { latitud, longitud } = req.body;

     const runnerCoordinatesSchema = Joi.object({
        latitud: Joi.number().required(),
        longitud: Joi.number().required()
    });

    const { error } = runnerCoordinatesSchema.validate({ latitud, longitud });
 
    if (error) {
        return res.status(400).json({
            error: "latitud, longitud deben ser números válidos."
        });
    }
    return next();
};

export default {
    validateId,
    validateCoordinates,
};

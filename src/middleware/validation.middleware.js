import Joi from "joi";

// const validateId = (req, res, next) => {
//     const { id } = req.body;
//     const regex = /^[A-Z]{3}\d{3}$/;
//     const result = regex.test(id);
//     console.log("Validating ID:", id, result);
//     if (result === false)
//         // return res.send(`El id debe ser un valor alfanumérico del tipo AAB123, pero es "${id}"`);
//     return res.status(400).json({ error: `El id debe ser un valor alfanumérico del tipo AAB123, pero es "${id}"` });
//     return next();

//     return res.status(400).json({ error: `El id debe ser ...` });
// };

const validateId = (req, res, next) => {
    // console.log("DEBUG validateId - req.body:", req.body);
//   console.log("DEBUG validateId - id:", typeof req.body.id, `"${req.body.id}"`);
    const runnerIdSchema = Joi.object({
        id: Joi.string()
            .pattern(/^[A-Z]{3}\d{3}$/)
            .required()
    });

    // const { error } = runnerIdSchema.validate(req.body);
    const { error } = runnerIdSchema.validate({ id: req.body.id });

    if (error) {
        return res.status(400).json({
            error: `El id debe ser un valor alfanumérico del tipo COR123.`
        });
    }

    next();
};

// export const validateId = (runner) => {
//     // const regex = /^[A-Z]{3}\d{3}$/;
//     const runnerSchema = Joi.object({
//         id: Joi.string()
//             .pattern(/^[A-Z]{3}\d{3}$/)
//             .required()
//     })

//     // validate -> es propia de Joi y valida el dato que yo le pase
//     const { error } = runnerSchema.validate(runner)
//     // Devuelve true si hay error, false si está OK
//     return error ? true : false;

// };


const validateCoordinates = (req, res, next) => {
    const { xa, ya, za } = req.body;
    const { xa, ya, za } = req.body;

    // Definimos el esquema Joi
    const runnerCoordinatesSchema = Joi.object({
        xa: Joi.number().required(),
        ya: Joi.number().required(),
        za: Joi.number().required()
    });

    // Validamos el body
    const { error } = runnerCoordinatesSchema.validate({ xa, ya, za });

    // Si hay error → devolver 400 con mensaje claro
    if (error) {
        return res.status(400).json({
            error: "xa, ya y za deben ser números válidos."
        });
    }

    // Si pasa la validación → continuar
    return next();
};

export default {
    validateId,
    validateCoordinates,
};

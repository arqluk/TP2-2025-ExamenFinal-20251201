import Joi from "joi";

const validateMagnitude = (req, res, next) => {

    const temperatureMagnitudeSchema = Joi.object({
        magnitud: Joi.number().integer()
        .required()
    });

    const { error } = temperatureMagnitudeSchema.validate({ magnitud: req.body.magnitud });

    if (error) {
        return res.status(400).json({
            error: "magnitud inválida"
        });
    }

    next();
};

const validateUnit = (req, res, next) => {

    const temperatureUnitSchema = Joi.object({
        unidad: Joi.string()
            .valid("kelvin", "celsius", "farenheit")
            .required()
    });
    const { error } = temperatureUnitSchema.validate({ unidad: req.body.unidad });
    if (error) {
        return res.status(400).json({
            error: "unidad no válida"
        });
    }
    next();
};

const validateRange = (req, res, next) => {

    const temperatureRangeSchema = Joi.object({
        min: Joi.number().integer().required(),
        max: Joi.number().integer().required()
    });
    const { error, value } = temperatureRangeSchema.validate(req.query);
    if (error) {
        return res.status(400).json({
            error: "datos no válidos",
            details: error.details[0].message
        });
    }
    const min = Number(value.min);
    const max = Number(value.max);
    // Validación extra: min no puede ser mayor a max
    if (min > max) {
        return res.status(400).json({
            error: "rango_invalido",
            message: "El valor 'min' no puede ser mayor que 'max'"
        });
    }
    // Agregar valores convertidos al request
    req.range = { min, max };
    next();
};

export default {
    validateMagnitude,
    validateUnit,
    validateRange
};



// -------------------------------------------------------------------------------

// const validateResponsible = (req, res, next) => {
//     // console.log("DEBUG validateDistrict - req.body:", req.body);

//     const turnsResponsibleSchema = Joi.object({
//         responsable: Joi.string()
//             .min(1)
//             .required()
//     })

//     const { error } = turnsResponsibleSchema.validate({ responsable: req.body.responsable });

//     if (error) {
//         return res.status(400).json({
//             error: "responsable no puede ser vacío"
//         });
//     }

//     next();
// };

// const validateTelephone = (req, res, next) => {
//     // console.log("DEBUG validateCandidate - req.body:", req.body);

//     const turnsTelephoneSchema = Joi.object({
//         telefono: Joi.string()
//             .pattern(/^[0-9]+$/)     // solo dígitos
//             .required()
//     });

//     const { error } = turnsTelephoneSchema.validate({ telefono: req.body.telefono });

//     if (error) {
//         return res.status(400).json({
//             error: "telefono admite sólo caracteres numéricos"
//         });
//     }

//     next();
//     };

// // Validaciones unificadas ...
// const validateTurnsDate = (req, res, next) => {

//     const turnsDateSchema = Joi.object({
//         dia: Joi.number().integer().min(1).max(30).required(),
//         mes: Joi.number().integer().min(1).max(12).required(),
//         hora: Joi.number().integer().min(0).max(23).required()
//     }).unknown(true);

//     const { error } = turnsDateSchema.validate(req.body);

//     if (error) {
//         return res.status(400).json({
//             error: "datos no válidos",
//             detalle: error.details[0].message
//         });
//     }

//     next();
// };

// const validateType = (req, res, next) => {
//     // console.log("DEBUG validateDistrict - req.body:", req.body);

//     const turnsTypeSchema = Joi.object({
//         tipo: Joi.string()
//             .valid("programado", "auxilio", "cotizacion")
//             .required()
//     });

//     const { error } = turnsTypeSchema.validate({ tipo: req.body.tipo });

//     if (error) {
//         return res.status(400).json({
//             error: "tipo no correspondiente"
//         });
//     }

//     next();

// }

// export default {
//     validateResponsible,
//     validateTelephone,
//     validateTurnsDate,
//     validateType
// };
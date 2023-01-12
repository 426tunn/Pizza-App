const Joi = require("joi");

const signupDataValidator = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
    first_name: Joi.string().min(1).max(30).required(),
    last_name: Joi.string().min(1).max(30).required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
        // user_type: Joi.string()
        //       .required()
});

const loginDataValidation = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
});

const signupValidationMiddleware = async (req, res, next) => {
    const signupPayload = req.body
    try {
        await signupDataValidator.validateAsync(signupPayload);
        next();
    } catch (error) {
        return res.status(406).send(error.details[0].message);
    }
};

const loginValidationMiddleware = async (req, res, next) => {
    const loginPayload = req.body
    try {
        await loginDataValidation.validateAsync(loginPayload);
        next();
    } catch (error) {
        return res.status(406).send(error.details[0].message);
    }
};

module.exports = { signupValidationMiddleware, loginValidationMiddleware };
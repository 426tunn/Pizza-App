const Joi = require('joi')


const addOrderSchema = Joi.object({
    state: Joi.number(),
    total_price: Joi.number(),
    items: Joi.array().items({
        name: Joi.string()
        .required(),
        price:Joi.number()
        .required(),
        size: Joi.string()
        .required(),
        quantity: Joi.number()
         .required()
    })

})


const updateOrderSchema = Joi.object({
    state: Joi.number()
      .required()
})

exports.AddOrderValiMw = async (req, res, next) => {
    const orderPayload = req.body 
    try {
        await addOrderSchema.validateAsync(orderPayload)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

exports.updateOrderValiMw = async (req, res, next) => {
    const orderPayload = req.body 
    try {
        await updateOrderSchema.validateAsync(orderPayload)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

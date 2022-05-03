import joi from 'joi'

const paramsSchema = joi.object({
	id: joi.number()
})

export default paramsSchema
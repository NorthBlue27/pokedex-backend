import * as Joi from 'joi';

// CREA LAS VARIABLES Y SI NO SE TIENE VALOR YA ESTABLECIDO, SE ASIGNA UNO 
export const JoiValidationSchema = Joi.object({
  MONGO_DB: Joi.required(),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(10),
  NAME_DB: Joi.required().default('pokemonsdb')
});

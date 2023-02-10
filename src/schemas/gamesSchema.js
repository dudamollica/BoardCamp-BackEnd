import joi from "joi";

export const gamesSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().required(),
  pricePerDay: joi.number().required(),
});

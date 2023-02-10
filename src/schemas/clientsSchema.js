import joi from "joi";

export const clientsSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().min(10).max(11).required(),
  cpf: joi.string().regex(/^[0-9]+$/).length(11).required(),
  birthday: joi.date().required(),
});

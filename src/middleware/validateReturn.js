import db from "../config/database.js";

export default async function validateReturn(req, res, next) {
    const { id } = req.params;
  try {
    const rent = await db.query(`SELECT * FROM rentals WHERE id=${id}`)
    if(rent.rows.length == 0) return res.status(404).send("Aluguel não existe");
    if (rent.rows[0].returnDate != null) return res.status(400).send("Aluguel já devolvido");
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

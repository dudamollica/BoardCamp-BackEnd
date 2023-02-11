import db from "../config/database.js";

export default async function validateClientGame(req, res, next) {
  const { customerId, gameId } = req.body;
  try {
    const clientExist = await db.query(
      `SELECT * FROM customers WHERE id='${customerId}'`
    );
    if (clientExist.rows.length == 0)
      return res.status(400).send("Cliente não existe");

    const gameExist = await db.query(
      `SELECT * FROM games WHERE id='${gameId}'`
    );
    if (gameExist.rows.length == 0)
      return res.status(400).send("Jogo não existe");

    let amountOfRents = await db.query(
      `SELECT ("returnDate") IS NULL FROM rentals WHERE "gameId"=${gameId}`
    );
    amountOfRents = amountOfRents.rows.length;
    const stock = gameExist.rows[0].stockTotal;
    if (amountOfRents >= stock)
      return res.status(400).send("Não há stoque disponível");

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

import db from "../config/database.js";

export async function showGames(req, res) {
  try {
    const games = await db.query("SELECT * FROM games");
    res.send(games.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function insertGames(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
}
import db from "../config/database.js";
import dayjs from "dayjs";

export async function showRents(req, res) {
  try {
    const rentals = await db.query("SELECT * FROM rentals");
    res.send(rentals.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function insertRent(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  try {
    let price = await db.query(
      `SELECT ("pricePerDay") FROM games WHERE id=${gameId}`
    );
    price = price.rows[0].pricePerDay;
    await db.query(
      `INSERT INTO rentals 
      ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
      VALUES (${customerId}, ${gameId}, '${dayjs().format("YYYY-MM-DD")}', ${daysRented}, null, ${price * daysRented}, null)`
    );
    res.status(201).send("Ok");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function finalizeRent(req, res) {}

export async function deleteRent(req, res) {
  const { id } = req.params;
  console.log(id)
  const rentalExist = await db.query(`SELECT * FROM rentals WHERE id=${id}`)
  if(rentalExist.rows[0].length == 0) return res.status(404).send("Aluguel não existe") 

  const isReturn = rentalExist.rows[0].returnDate
  if (!isReturn) return res.status(400).send("Jogo ainda não devolvido") 

  await db.query(`DELETE FROM rentals WHERE id=${id}`)
  res.status(200).send("Deletado")
}

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
    let price = await db.query(`SELECT ("pricePerDay") FROM games WHERE id=${gameId}`)
    price = price.rows[0].pricePerDay
    await db.query(
      `INSERT INTO rentals 
      ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
      VALUES (${customerId}, ${gameId}, '${dayjs().format("YYYY-MM-DD")}', ${daysRented}, null, ${price*daysRented}, null)`
    );
    res.status(201).send("Ok");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function finalizeRent(req, res) {}
export async function deleteRent(req, res) {}

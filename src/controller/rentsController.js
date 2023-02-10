import db from "../config/database.js";

export async function showRents(req, res) {
  try {
    const rentals = await db.query("SELECT * FROM rentals");
    res.send(rentals.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function insertRent(req, res) {}
export async function finalizeRent(req, res) {}
export async function deleteRent(req, res) {}

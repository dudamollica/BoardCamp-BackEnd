import db from "../config/database.js";

export async function showClients(req, res) {
  try {
    const clients = await db.query("SELECT * FROM customers");
    res.send(clients.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function showEspecificClient(req, res) {
  const { id } = req.params;
  try {
    const client = await db.query(`SELECT * FROM customers WHERE id=${id}`);
    res.send(client.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function insertClient(req, res) {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateClients(req, res) {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
}

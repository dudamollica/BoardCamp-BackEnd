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
    if (client.rows.length == 0) return res.status(404).send("Status 404");
    res.send(client.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function insertClient(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  try {
    const client = await db.query(`SELECT * FROM customers WHERE cpf='${cpf}'`);
    if (client.rows.length > 0) return res.status(409).send("Status 409");

    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${name}','${phone}','${cpf}','${birthday}')`
    );
    res.status(201).send("Ok");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateClients(req, res) {
  const { id } = req.params;
  const { name, phone, cpf, birthday } = req.body;
  try {
    const client = await db.query(`SELECT * FROM customers WHERE id='${id}'`);
    if (client.rows[0].name != name) {
      await db.query(`UPDATE customers SET name='${name}' where id=${id}`);
    }

    if (client.rows[0].phone != phone) {
      await db.query(`UPDATE customers SET phone='${phone}' where id=${id}`);
    }

    if (client.rows[0].cpf != cpf) {
      const cpfExist = await db.query(
        `SELECT * FROM customers WHERE cpf='${cpf}'`
      );
      if (cpfExist.rows.length > 0) return res.status(409).send("Status 409");
      await db.query(`UPDATE customers SET cpf='${cpf}' where id=${id}`);
    }

    if (client.rows[0].birthday != birthday) {
      await db.query(
        `UPDATE customers SET birthday='${birthday}' where id=${id}`
      );
    }

    res.status(200).send("OK");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

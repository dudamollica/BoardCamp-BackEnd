import db from "../config/database.js";
import dayjs from "dayjs";

export async function showRents(req, res) {
  try {
    const rentals =
      await db.query(`SELECT rentals.*, customers.name AS "customersName", games.name AS "gamesName"
  FROM rentals 
  JOIN customers 
  ON "customerId" = customers.id 
  JOIN games 
  ON "gameId" = games.id;`);

    let rentalsRows = rentals.rows;

    const rental = rentalsRows.map((i) => ({
      id: i.id,
      customerId: i.customerId,
      gameId: i.gameId,
      rentDate: i.rentDate,
      daysRented: i.daysRented,
      returnDate: i.returnDate,
      originalPrice: i.originalPrice,
      delayFee: i.delayFee,
      customer: {
        id: i.customerId,
        name: i.customersName,
      },
      game: {
        id: i.gameId,
        name: i.gamesName,
      },
    }));
    res.send(rental);
  } catch (err) {
    res.status(500).send(err.message);
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
      VALUES (${customerId}, ${gameId}, '${dayjs().format(
        "YYYY-MM-DD"
      )}', ${daysRented}, null, ${price * daysRented}, null)`
    );
    res.status(201).send("Ok");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function finalizeRent(req, res) {
  const { id } = req.params;
  await db.query(
    `UPDATE rentals SET "returnDate"='${dayjs().format(
      "YYYY-MM-DD"
    )}' WHERE id=${id}`
  );

  const rent = await db.query(`SELECT * FROM rentals WHERE id=${id}`);
  const daysRented = rent.rows[0].daysRented;
  const rentDate = rent.rows[0].rentDate;
  const correctDate = dayjs(rentDate)
    .add(daysRented, "day")
    .format("YYYY-MM-DD");
  const returnDate = rent.rows[0].returnDate;

  const date1 = dayjs(correctDate);
  const date2 = dayjs(returnDate);
  const difference = date2.diff(date1, "day");
  const gameId = rent.rows[0].gameId;
  const pricePerDay = await db.query(
    `SELECT ("pricePerDay") FROM games WHERE id=${gameId}`
  );
  const delayFee = difference * pricePerDay.rows[0].pricePerDay;

  if (date1.isBefore(date2)) {
    await db.query(`UPDATE rentals SET "delayFee"=${delayFee} WHERE id=${id}`);
  }
  res.status(200).send("OK");
}

export async function deleteRent(req, res) {
  const { id } = req.params;

  const rentalExist = await db.query(`SELECT * FROM rentals WHERE id=${id}`);
  if (rentalExist.rows.length == 0)
    return res.status(404).send("Aluguel não existe");

  const isReturn = rentalExist.rows[0].returnDate;
  if (!isReturn) return res.status(400).send("Jogo ainda não devolvido");

  await db.query(`DELETE FROM rentals WHERE id=${id}`);
  res.status(200).send("Deletado");
}

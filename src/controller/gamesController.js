export async function showGames(req, res) {
  try {
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

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const scrapeWordMeaning = require("./web-scrape");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/scrape", async (req, res) => {
  const queryWord = req.body.searchText;
  try {
    const [word, meaning] = await scrapeWordMeaning(queryWord);
    res.status(200).json({ word, meaning });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

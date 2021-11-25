const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  console.log("GET /");
  res.send("Hello World!");
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

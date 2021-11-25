const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const db = require("./config/database");
const app = express();
app.use(bodyParser.json());



app.get("/", (req, res) => {
  console.log("GET /");
  res.send("Hello World!");
});



db.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.log(err));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

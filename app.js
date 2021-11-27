const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const db = require("./config/database");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//user routes
app.use("/user", require("./routes/user"));
// posts routes
app.use("/post", require("./routes/post"));
// comments routes
app.use("/comment", require("./routes/comment"));
//connect to database
db.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.log(err));
//start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// required modules
const express = require("express");
const path = require("path");

// server application at dynamic port 3000
const app = express();
const PORT = process.env.PORT || 3000;

// Reading URL or JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Including js files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Using public folder
app.use(express.static("public"));

// Adding listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

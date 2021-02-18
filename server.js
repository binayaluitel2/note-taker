// add required modules
const express = require("express");
const path = require("path");

// Dynamic port
const app = express();
const PORT = process.env.PORT;

// Read URL or JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Include js files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Use public folder
app.use(express.static("public"));

// Add listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

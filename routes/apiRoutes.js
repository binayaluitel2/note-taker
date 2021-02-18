// Required Modules
const fs = require("fs");
const notesData = require("../db/db.json");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(notesData);
  });

  app.post("/api/notes", function (req, res) {
    let rawdata = fs.readFileSync("db/db.json");

    let notesArray = JSON.parse(rawdata);

    req.body.id = Math.floor(Math.random() * 9999999999).toString();
    console.log("req.body.id: " + req.body.id);

    notesArray.push(req.body);

    notesString = JSON.stringify(notesArray);
    fs.writeFileSync("db/db.json", notesString, function (err) {
      if (err) {
        return console.log(err);
      }
    });

    res.json(notesArray);
  });

  app.delete("/api/notes/:id", function (req, res) {
    let rawdata = fs.readFileSync("db/db.json");

    let notesArray = JSON.parse(rawdata);

    let id = req.params.id.toString();

    for (i = 0; i < notesArray.length; i++) {
      if (notesArray[i].id == id) {
        res.send(notesArray[i]);
        notesArray.splice(i, 1);
        break;
      }
    }

    notesString = JSON.stringify(notesArray);
    fs.writeFileSync("db/db.json", notesString, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
};

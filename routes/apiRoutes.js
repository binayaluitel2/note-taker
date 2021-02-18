// Required Modules
const fs = require("fs");
const notesData = require("../db/db.json");

module.exports = function (app) {
  function writeToDB(notes) {
    // Converts new JSON Array back to string
    notes = JSON.stringify(notes);
    console.log(notes);
    // Writes String back to db.json
    fs.writeFileSync("./db/db.json", notes, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  }

  // Returns all notes
  app.get("/api/notes", function (req, res) {
    res.json(notesData);
  });

  // Adds notes
  app.post("/api/notes", function (req, res) {
    // Sets unique id to entry
    if (notesData.length == 0) {
      req.body.id = "0";
    } else {
      req.body.id = JSON.stringify(
        JSON.parse(notesData[notesData.length - 1].id) + 1
      );
    }

    console.log("req.body.id: " + req.body.id);

    // Pushes Body to JSON Array
    notesData.push(req.body);

    // Writes notes data to database
    writeToDB(notesData);
    console.log(notesData);

    // Returns new note
    res.json(req.body);
  });

  // Deletes note with specified ID
  app.delete("/api/notes/:id", function (req, res) {
    // Gets id and converts to string
    let id = req.params.id.toString();
    console.log(id);
    for (i = 0; i < notesData.length; i++) {
      if (notesData[i].id == id) {
        console.log("match!");
        res.send(notesData[i]);

        notesData.splice(i, 1);
        break;
      }
    }

    // Writes notes data to database
    writeToDB(notesData);
  });
};

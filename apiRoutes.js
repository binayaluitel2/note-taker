const notesData = require("./db.json");
const journalData = require("./journal.json");

module.exports = function(app){

    app.get("/api/notes", function(req, res){
        res.json(notesData);
    });

    app.get("/api/journal", function(req, res){
        res.json(journalData);
    });

};
const fs = require("fs");
const path = require("path");
const notesDB = require("../db/db.json");
const express = require("express");
const notes = express.Router();

// This lets the notes be manipulated in other nests such as the notes.get nest
let notesData = notesDB;

// This writes the file to the database with any updated info/data
const saveDb = () => {
    fs.writeFileSync(path.resolve(__dirname, "../db/db.json"), JSON.stringify(notesData));
};

// This retrieves the information from the database
notes.get("/notes", (req, res) => {
    notesData = notesData.map((note, index) => ({ ...note, id: index + 1 }));
    res.json(notesData);
});

// This will create new data for the database based on the input
notes.post("/notes", (req, res) => {
    notesData.push(req.body);
    saveDb();
    res.json(notesData);
});

// This will delete single notes and update the database
notes.delete("/notes/:id", (req, res) => {
    let notesID = req.params.id -1 ;
    notesData.splice(notesID , 1);
    saveDb();
    res.json(notesData);
});

module.exports = notes;
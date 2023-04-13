const fs = require("fs");
const path = require("path");
const notesData = require("../db/db.json");
const express = require("express");
const router = express.Router();

// This lets the notes be manipulated in other nests such as the router.get nest
let notes = notesData;

// This writes the file to the database with any updated info/data
const saveDB = () => {
    fs.writeFileSync(path.resolve(__dirname, "../db/db.json"), JSON.stringify(notes));
};

// This retrieves the information from the database
router.get("/notes", (req, res) => {
    notes = notes.map((note, index) => ({ ...note, id: index }));
    res.json(notes);
});

// This will create new data for the database based on the input
router.post("/notes", (req, res) => {
    notes.push(req.body);
    saveDB();
    res.json(notes);
});

// This will delete single notes and update the database
router.delete("/notes/:id", (req, res) => {
    notes.splice(req.params.id, 1);
    saveDB();
    res.json(notes);
});

module.exports = router;
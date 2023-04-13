const { prototype } = require("events");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const api = require("./routes/api");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use("/api", api);

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));

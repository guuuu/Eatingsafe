const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");

app.use(express.static(__dirname + "\\..\\.."));

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname + "\\..\\..", "login.html"));
});

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "\\..\\..", "error.html"));
});

app.listen(port, console.log(`Server listening on port ${port}`));
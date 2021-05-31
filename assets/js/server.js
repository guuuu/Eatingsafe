const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");

app.use(express.static(__dirname + "\\..\\.."));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname + "\\..\\..", "login.html"));
});

app.post("/do_login", (req, res) => {
    const { user, pwd } = req.body;
    res.status(200).send({user: user, pwd: pwd});
});

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "\\..\\..", "error.html"));
});

app.listen(port, console.log(`Server listening on port ${port}`));
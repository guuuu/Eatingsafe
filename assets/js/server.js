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

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname + "\\..\\..", "register.html"));
});

app.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname + "\\..\\..", "profile.html"));
});

app.get("/reset", (req, res) => {
    res.sendFile(path.join(__dirname + "\\..\\..", "reset.html"));
});

app.post("/do_login", (req, res) => {
    const { user, pwd } = req.body;
    if(user === "admin" && pwd === "admin"){
        res.status(200).send({status: 0});
    }
    else{
        res.status(200).send({status: 1});
    }
});

app.post("/do_regist", (req, res) => {
    const { user, email, pwd, age, gender, alergies } = req.body;

    res.status(200).send({
        user: user,
        email: email,
        pwd: pwd,
        age: age,
        gender: gender,
        alergies: alergies
    });
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "\\..\\..", "error.html"));
});

app.listen(port, console.log(`Server listening on port ${port}`));
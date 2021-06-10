const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const fs = require("fs");
const p = __dirname + "\\..\\..\\public"

app.use(express.static(p));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/login", (req, res) => {
    res.sendFile(path.join(p, "login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(p, "register.html"));
});

app.get("/profile", (req, res) => {
    res.sendFile(path.join(p, "profile.html"));
});

app.get("/reset", (req, res) => {
    res.sendFile(path.join(p, "reset.html"));
});

app.get("/alergies", (req, res) => {
    res.sendFile(path.join(p, "alergias.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(p, "stats.html"));
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

app.get("/get_alergies", (req, res) => {
    res.status(200).send(JSON.parse(fs.readFileSync('alergenios.json'))[0].alergias.reverse());
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(p, "login.html"));
});

app.listen(port, console.log(`Server listening on port ${port}`));
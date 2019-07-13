const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/data");
const app = express();

mongoose
    .connect("mongodb://localhost/serverless-express", { useNewUrlParser: true })
    .then(() => console.log("Connected to m labs"))
    .catch(err => console.log(err));

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/user", function(req, res) {
    User.find({})
        .then(data => {
        res.status(200).send(data);
        })
    .catch(err => res.send("Something Went Wrong"));
});

app.post("/user", function(req, res) {
    const name = req.body.name;
    const age = req.body.age;

    const user = User({
        name,
        age
    });
    user
        .save()
        .then(data => res.status(200).send(data))
        .catch(err => res.send("Error occured"));
});

app.put("/user/:id", function(req, res) {
    const name = req.body.name;
    const age = req.body.age;

    User.findByIdAndUpdate(
        { _id: req.params.id },
        {
        $set: {
            name,age
        }
        },
        { new: true }
    )
        .then(data => res.send(data))
        .catch(err => res.send(err));
});

app.delete("/user/:id", function(req, res) {
    User.findByIdAndRemove({ _id: req.params.id })
        .then(data => res.send(data))
        .catch(err => res.send("Error Occured "));
});

module.exports.handler = serverless(app);
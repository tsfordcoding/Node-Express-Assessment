const express = require("express");
const app = express();

// MiddleWare
const validateZip = require("./middleware/validateZip");

// getZoos.js
const getZoos = require("./utils/getZoos");

// Zoos All Route
app.get("/zoos/all", (req, res, next) => {
  const admin = req.query.admin;

  if (admin !== "true") {
    next("You do not have access to that route.");
  } else {
    res.send(`All zoos: ${getZoos().join("; ")}`);
  }
});

// Check Zip Route
app.get("/check/:zip", validateZip, (req, res, next) => {
  res.send(`${req.params.zip} exists in our records.`);
});

// Zoos Zip Route
app.get("/zoos/:zip", validateZip, (req, res, next) => {
  if (getZoos(`${req.params.zip}`).length === 1) {
    res.send(`${req.params.zip} zoos: ${getZoos(req.params.zip)}`);
  } else if (getZoos(`${req.params.zip}`).length >= 2) {
    res.send(`${req.params.zip} zoos: ${getZoos(req.params.zip).join("; ")}`);
  } else {
    res.send(`${req.params.zip} has no zoos.`);
  }
});

// Not-found handler
app.use((req, res, next) => {
  res.send("That route could not be found!");
});

// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.send(err);
});

module.exports = app;

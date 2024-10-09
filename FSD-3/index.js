require("dotenv").config();

var express = require('express');
var app = express();
const mongoose = require("mongoose");

var url = "mongodb://127.0.0.1:27017";

// Setting up connection parameters
const connectionParams = {
  dbName: 'dockerdemo',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Exception handling using try-catch
try {
  mongoose.connect(url, connectionParams);
  console.log("Connected to database successfully");
} catch (error) {
  console.log(error);
  console.log("Could not connect to database!");
}

// Define the schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Customer = mongoose.model("customers", customerSchema);

// Default route
app.get('/', function (req, res) {
  res.send('Greetings from the server!');
});

// Route with Mongo create functionality
app.get('/createMongo', function (req, res) {
  var name = 'user' + Math.floor(Math.random() * 10000);
  var email = name + '@mit.edu';
  var doc = { 'name': name, 'email': email };

  new Customer({ 'name': name, 'email': email }).save();
  console.log(doc);
  res.send(doc);
});

// Route with Mongo read functionality
app.get('/readMongo', async function (req, res) {
  try {
    const results = await Customer.find({});
    res.json({ Data: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

var port = 3000;
app.listen(port, function () {
  console.log('Listening on port: ' + port);
});
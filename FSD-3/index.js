require("dotenv").config();

const express = require('express');
const mongoose = require("mongoose");

const app = express();

const url = "mongodb://mongo:27017"; // Use the service name 'mongo' for Docker

// Setting up connection parameters
const connectionParams = {
  dbName: 'dockerdemo',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Exception handling using try-catch
async function connectToDatabase() {
  try {
    await mongoose.connect(url, connectionParams);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect to database!");
  }
}

// Call the database connection function
connectToDatabase();

// Define the schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Customer = mongoose.model("customers", customerSchema);

// Default route
app.get('/', (req, res) => {
  res.send('Greetings from the server!');
});

// Route to create a new customer
app.get('/createMongo', async (req, res) => {
  const name = 'user' + Math.floor(Math.random() * 10000);
  const email = `${name}@mit.edu`;
  const doc = { name, email };

  try {
    const customer = new Customer(doc);
    await customer.save();
    console.log(doc);
    res.send(doc);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating customer');
  }
});

// Route to read customers
app.get('/readMongo', async (req, res) => {
  try {
    const results = await Customer.find({});
    res.json({ Data: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

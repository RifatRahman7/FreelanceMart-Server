const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()
app.use(cors());
app.use(express.json());



//const uri = "mongodb+srv://FreelanceMart:M7ODUxryHWwHOSuu@cluster0.gle9ffl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gle9ffl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//console.log(process.env.DB_USER, process.env.DB_PASS);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Marketplace server is working!');
});


app.listen(port, () => {
  console.log(`Marketplace server is running on port ${port}`);
});
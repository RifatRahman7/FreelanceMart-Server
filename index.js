const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { ObjectId } = require('mongodb');
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
    const tasksCollection = client.db("freelanceMart").collection("tasks");
    app.get("/my-tasks", async (req, res) => {
      const userEmail = req.query.email;
      //console.log(userEmail);
      if (!userEmail) {
        return res.status(400).send("Email query parameter is required");
      }
      const result = await tasksCollection.find({userEmail}).toArray();
      res.send(result);
    })
    app.get("/tasks", async (req, res) => {
      const result = await tasksCollection.find().sort({deadline:1}).toArray();
       //console.log(result);
      res.send(result);
    })

     

    app.get("/tasks/featured", async (req, res) => {
      const result = await tasksCollection.find().sort({deadline:1}).limit(6).toArray();
      console.log(result);
      res.send(result);
    });
    app.get('/tasks/:id', async (req, res) => {
      const { id } = req.params;
      try {
        const task = await taskCollection.findOne({ _id: new ObjectId(id) });
        if (!task) {
          return res.status(404).send({ message: "Task not found" });
        }
        res.send(task);
      } catch (error) {
        res.status(500).send({ message: "Invalid task ID", error });
      }
    });
    app.post("/tasks", async (req, res) => {
      const task = req.body;
      // console.log(task);
      const result = await tasksCollection.insertOne(task);
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You are successfully connected to MongoDB!");
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Marketplace server is working perfectly!');
});


app.listen(port, () => {
  console.log(`Marketplace server is running on port ${port}`);
});
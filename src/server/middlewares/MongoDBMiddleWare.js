const { readFileSync } = require("fs");
const express = require("express");
const router = express.Router();

const { config } = require("dotenv");
const mongoose = require("mongoose");
//use .env file for process level config
config({
  path: "../../.env",
});
const Task = require("../model/task");

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
  try {
    await mongoose.disconnect();
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.DATABASE_URL, clientOptions);
    const db = await mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to Database"));
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
// Getting all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one task
router.post("/add-task", async (req, res) => {
  const task = new Task({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    date: req.body.date,
    comments: req.body.comments,
  });
  try {
    const newTask = await task.save();
    res.status(201).json({ savedObject: newTask });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating a task
router.patch("/update-task/:id", getTask, async (req, res) => {
  if (req.body.id != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting a task
router.delete("/delete-task/:id", getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: "Deleted task" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTask(req, res, next) {
  let aTask;
  try {
    aTask = await Task.findById(req.params.id);
    if (aTask == null) {
      return res.status(404).json({ message: "Cannot find task" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = aTask;
  next();
}

// Getting all translations
router.get("/translations", async (req, res) => {
  try {
    const controlTranslations = JSON.parse(
      readFileSync("./translations/controls.json")
    );
    const infoTranslations = JSON.parse(
      readFileSync("./translations/info.json")
    );

    setTimeout(() => {
      res
        .status(200)
        .send(JSON.stringify({ ...controlTranslations, ...infoTranslations }));
    }, 2000);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

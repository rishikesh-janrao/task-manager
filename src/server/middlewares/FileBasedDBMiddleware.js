const { readFileSync, writeFileSync } = require("fs");
const express = require("express");
const router = express.Router();

// Getting all translations
router.get("/tasks", async (req, res) => {
  try {
    const tasks = JSON.parse(readFileSync("./database/tasks.json"));

    setTimeout(() => {
      res.status(200).send(JSON.stringify(tasks));
    }, 2000);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one task

const addUpdateTask = async (req, res) => {
  const task = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    date: req.body.date,
    comments: req.body.comments,
  };
  try {
    let tasks = JSON.parse(readFileSync("./database/tasks.json"));
    tasks = {
      ...tasks,
      [task.id]: task,
    };

    writeFileSync("./database/tasks.json", JSON.stringify(tasks));
    res.status(201).json({ savedObject: task });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    let tasks = JSON.parse(readFileSync("./database/tasks.json"));
    if (id) {
      delete tasks[id];
    }

    writeFileSync("./database/tasks.json", JSON.stringify(tasks));
    res.status(201).json({});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

router.post("/add-task", addUpdateTask);
router.post("/update-task", addUpdateTask);
router.delete("/delete-task/:id", deleteTask);

module.exports = router;

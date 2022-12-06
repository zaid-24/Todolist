const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const db = require("./models/");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

function success(res, payload) {
  return res.status(200).json(payload);
}

app.get("/todo", async (req, res, next) => {
  try {
    const todo = await db.Todo.find({});
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "failed to get todo" });
  }
});

app.post("/todo", async (req, res, next) => {
  try {
    const todo = await db.Todo.create(req.body);
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "failed to create todo" });
  }
});

app.put("/todo/:id", async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "failed to update todo" });
  }
});
app.delete("/todo/:id/delete", async (req, res, next) => {
  try {
    await db.Todo.findByIdAndRemove(req.params.id);
    return success(res, "todo deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete todo" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing this request"
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

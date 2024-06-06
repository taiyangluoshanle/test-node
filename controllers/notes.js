const notesRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Note = require("../models/note");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

// 获取所有笔记
notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 });
  response.json(notes);
});

// 获取单个笔记${id}
notesRouter.get("/:id", async (request, response, next) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// 删除笔记${id}
notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

// 更新笔记${id}
notesRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  console.log(body, "____");
  const note = {
    content: body.content,
    important: body.important,
    // user: body.userId,
  };
  // const user = await User.findById(body.userId);
  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
  });
  // user.notes = [...new Set(user.notes.concat(updatedNote._id))];
  // await user.save();
  response.json(updatedNote);
});

// 添加笔记
notesRouter.post("", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: body.userId,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();
  response.json(savedNote);
});

module.exports = notesRouter;

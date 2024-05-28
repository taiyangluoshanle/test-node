const notesRouter = require("express").Router();
const Note = require("../models/note");
// 获取所有笔记
notesRouter.get("/", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// 获取单个笔记${id}
notesRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        console.log("找到了");
        response.json(note);
      } else {
        console.log("没有找到");
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// 删除笔记${id}
notesRouter.delete("/:id", (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// 更新笔记${id}
notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

// 添加笔记
notesRouter.post("", (request, response) => {
  const body = request.body;
  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

module.exports = notesRouter;

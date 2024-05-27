const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const Note = require("./models/note");
const PhoneBook = require("./models/phonebook");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("Status:  ", response.statusCode);
  console.log("---");
  next();
};
const unknownEndpoint = (request, response) => {
  console.log(request);
  response.status(404).send({ error: "unknown endpoint" });
};
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// app.use(unknownEndpoint);
app.use(errorHandler);
app.use(express.json());
// app.use(requestLogger);
app.use(express.static("build"));
app.use(cors());

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

// 首页
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// 获取所有笔记
app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// 获取单个笔记${id}
app.get("/api/notes/:id", (request, response, next) => {
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
app.delete("/api/notes/:id", (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// 更新笔记${id}
app.put("/api/notes/:id", (request, response, next) => {
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
app.post("/api/notes", (request, response) => {
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

// 获取所有通讯录
app.get("/api/phonebook", (req, res) => {
  PhoneBook.find({}).then((phonebook) => res.json(phonebook));
});

// 获取单个通讯录${id}
app.get("/api/phonebook/:id", (req, res, next) => {
  PhoneBook.findById(req.params.id)
    .then((phonebook) => {
      if (phonebook) {
        res.json(phonebook);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// 删除通讯录${id}
app.delete("/api/phonebook/:id", (req, res) => {
  PhoneBook.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// 添加通讯录
app.post("/api/phonebook", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const phonebook = new Note({
    name: body.name,
    phone: body.importphoneant || false,
  });

  phonebook.save().then((savedNote) => {
    response.json(savedNote);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

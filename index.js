const express = require("express");
const app = express();
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("Status:  ", response.statusCode);
  console.log("---");
  next();
};
app.use(express.json());
app.use(requestLogger);

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

let phoneBook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    return note.id === id;
  });
  if (note) {
    console.log(note);
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;
  console.log(response.statusCode);

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

app.get("/api/phonebook", (req, res) => {
  res.json(phoneBook);
});

app.get("/api/phonebook/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = phoneBook.find((note) => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    return note.id === id;
  });
  res.json(book);
});

app.get("/info", (req, res) => {
  res.send(`requests ${notes.length}, requests ${new Date()}`);
});

app.delete("/api/phonebook/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  if (id) {
    phoneBooks = phoneBook.filter((note) => note.id !== id);
    res.json(phoneBooks);
  }
  res.status(404).end();
});

app.post("/api/phonebook", (request, response) => {
  const body = request.body;
  if (
    !body.name ||
    !body.number ||
    phoneBook.find((item) => item.name === body.name)
  ) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const book = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  phoneBook = phoneBook.concat(book);

  response.json(book);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

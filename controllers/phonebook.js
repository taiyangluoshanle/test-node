const phoneBoolRouter = require("express").Router();
const PhoneBook = require("../models/note");

// 获取所有通讯录
phoneBoolRouter.get("/", (req, res) => {
  PhoneBook.find({}).then((phonebook) => res.json(phonebook));
});

// 获取单个通讯录${id}
phoneBoolRouter.get("/:id", (req, res, next) => {
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
phoneBoolRouter.delete("/:id", (req, res) => {
  PhoneBook.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// 添加通讯录
phoneBoolRouter.post("", (request, response) => {
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

module.exports = phoneBoolRouter;

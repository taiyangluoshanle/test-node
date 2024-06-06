const bcrypt = require("bcrypt");
const userRouter = require("express").Router();

const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = new User({
    ...body,
    passwordHash: await bcrypt.hash(body.password, 10),
  });
  const savedNote = await user.save();
  response.json(savedNote);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("notes", { content: 1, date: 1 });
  response.json(users);
});

module.exports = userRouter;

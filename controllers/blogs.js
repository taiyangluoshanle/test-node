const blogsRoute = require("express").Router();
const Blog = require("../models/blog");

// 获取所有博客
blogsRoute.get("/", (request, response) => {
  Blog.find({}).then((notes) => {
    response.json(notes);
  });
});

// 创建博客
blogsRoute.post("/", (request, response) => {
  const body = request.body;
  if (body.title === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });
  blog.save().then((savedBlog) => {
    response.json(savedBlog);
  });
});

module.exports = blogsRoute;

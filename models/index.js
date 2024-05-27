// db.js
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// MongoDB连接字符串
const url = process.env.MONGODB_URI;

// 创建连接
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// 全局暴露Mongoose实例
module.exports = mongoose;

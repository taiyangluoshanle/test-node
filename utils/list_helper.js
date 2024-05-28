const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  // ...
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const findMostLike = (blogs) => {
  return blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
};

module.exports = {
  dummy,
  totalLikes,
  findMostLike,
};

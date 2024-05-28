const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("listhelper", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });
  test("total", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 5);
  });
  test("mostLike", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
      {
        _id: "asdasd",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 10,
        __v: 0,
      },
    ];
    const result = listHelper.findMostLike(blogs);
    assert.deepEqual(result, {
      _id: "asdasd",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 10,
      __v: 0,
    });
  });
});

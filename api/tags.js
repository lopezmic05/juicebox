const express = require("express");
const tagsRouter = express.Router();

const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  const deleteTags = tags.filter((user) => {
    return user.active;
  });
  console.log("receieved all TAGS");
  res.send({
    deleteTags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  console.log("Starting Second GET");
  const tagName = req.params.tagName;

  try {
    console.log("starting TAGS");
    const returnPosts = await getPostsByTagName(tagName);
    console.log("middle of TAGS");
    const filteredPosts = returnPosts.filter(post =>{
      return post.active || (req.user && post.author.id === req.user.id)
    })
    if (returnPosts) {
      res.send({ filteredPosts });
    }

    console.log("finish TAGS");
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;

const express = require("express");
const tagsRouter = express.Router();

const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next(); // THIS IS DIFFERENT
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();
  console.log('receieved all TAGS')
  res.send({
    tags,
  });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  console.log('Starting Second GET')
    const  tagName = req.params.tagName
  
  try {
    console.log('starting TAGS')
    const returnPosts = await getPostsByTagName(tagName)
    console.log('middle of TAGS')
    if (returnPosts) {
      res.send({returnPosts})
    }
    
    console.log('finish TAGS')
    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
  } catch ({ name, message }) {
    next ({ name, message })
  }
});

module.exports = tagsRouter;

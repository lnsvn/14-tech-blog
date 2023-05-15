const router = require('express').Router();
const { Post } = require('../../models');

router.get("/", async (req, res) => {
    try {
      const dbPostData = await Post.findAll();
  
      res.json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;
const router = require('express').Router();
const { Comment } = require('../../models');

router.get("/", async (req, res) => {
    try {
      const dbCommentData = await Comment.findAll();
  
      res.json(dbCommentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.post("/")

module.exports = router;
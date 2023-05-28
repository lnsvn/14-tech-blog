const router = require('express').Router();
const { Comment, Post } = require('../../models');

// router.get("/", async (req, res) => {
//     try {
//       const dbCommentData = await Comment.findAll();
  
//       res.json(dbCommentData);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
// });

// router.post("/")

// router.get("/", async (req, res) => {
//   try {
//     const dbPostData = await Post.findAll();

//     res.json(dbPostData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get("/:id", async (req, res) => {
try {
  const postData = await Post.findByPk(req.params.id, {
    include: [
        {
            model: User,
            attributes: ['username'],
        },
    ],
  });
  const posts = postData.map((post) => post.get({ plain: true }));
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

module.exports = router;
const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try {
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
            ],
        });
    
        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
    
        res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    } catch {
        res.status(500).json(err);
        console.log(err);
    }
})

router.get('/login', async (req,res) => {
    try {
        res.render("login")
    } catch {
        res.status(500).json(err);
        console.log(err);
    }
})

router.get('/dashboard', async (req,res) => {
    try {
        res.render("dashboard")
    } catch {
        res.status(500).json(err);
        console.log(err);
    }
})

module.exports = router;
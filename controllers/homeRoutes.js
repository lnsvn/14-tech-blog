const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
    
        const posts = postData.map((post) => post.get({ plain: true }));
    
        res.render("homepage", { 
            posts, 
            logged_in: req.session.logged_in,
        });
    } catch {
        res.status(500).json(err);
        console.log(err);
    }
})

router.get('/login', async (req,res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
            return;
        }
        res.render("login")
    } catch {
        res.status(500).json(err);
        console.log(err);
    }
})

router.get('/sign-up', async (req,res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/dashboard');
            return;
        }
        res.render("sign-up")
    } catch {
        res.status(500).json(err);
        console.log(err);
    }
})

router.get('/dashboard', withAuth, async (req,res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
      
        const user = userData.get({ plain: true });

        res.render("dashboard", { 
            ...user, 
            logged_in: req.session.logged_in 
        });
    } catch {
        res.status(500).json(err);
        console.log(err);
    }
})

module.exports = router;
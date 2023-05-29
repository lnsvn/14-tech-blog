const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
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

router.get('/login', async (req, res) => {
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

router.get('/sign-up', async (req, res) => {
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

router.get('/dashboard', withAuth, async (req, res) => {
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

router.get('/post', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render("create-post", {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch {
        res.status(500).json(err);
        console.log(err);
    }
})

router.get('/update-post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render("update-post", {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch {
        res.status(500).json(err);
        console.log(err);
    }
})

router.get('/comments/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        },
                    ],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render("post-comments", {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

router.get('/add-comment/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'username'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render("add-comment", {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err){
        res.status(500).json(err);
        console.log(err);
    }
})

module.exports = router;
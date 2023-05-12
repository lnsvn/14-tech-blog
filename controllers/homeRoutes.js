const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try {
        res.render("homepage")
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
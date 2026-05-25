import express from 'express';
import { isAuth, logout, signIn, signUp } from './user.controller.js';
import { isAuthenticated } from '../../utils/middleware/auth.middleware.js';
import { requireAuth } from '../../utils/middleware/requireAuth.js';


const router = express.Router();



router.post('/signin',signIn)
router.post('/signup',signUp)
router.get("/logout", logout);
router.get("/register", (req, res) => {

    res.render("register");

});
router.get("/profile", requireAuth, (req, res) => {
    res.render("profile", { user: req.user });
});

export default router;
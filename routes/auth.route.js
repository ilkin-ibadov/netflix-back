import express from "express";
import { login, logout, signup, refreshToken } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post('/refresh', refreshToken)
router.get('/me', protect, (req, res) => {
    res.json(req.user)
})

export default router;

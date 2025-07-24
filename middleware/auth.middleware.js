import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const protect = async (req, res, next) => {
	try {
		const auth = req.headers.authorization
		const token = auth?.split(' ')[1] || req.cookies.accessToken
		if (!token) {
			return res.status(401).json({ error: 'Not authorized' })
		}
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.user = await User.findById(decoded.id).select('-password')
		next()
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return res.status(401).json({ error: 'Token expired' });
		} else if (error.name === 'JsonWebTokenError') {
			return res.status(401).json({ error: 'Invalid token' });
		}
		console.error("Auth error:", error);
		res.status(500).json({ error: 'Internal server error' });
	}
}
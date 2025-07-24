import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenGenerator.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
	try {
		const { username, email, password } = req.body
		const user = await User.create({ username, email, password })
		const accessToken = generateAccessToken(user, res)
		const refreshToken = generateRefreshToken(user, res)

		user.refreshToken = refreshToken

		await user.save()

		res.status(201).json({ accessToken, refreshToken })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	if (!user) {
		return res.status(404).json({ error: "User not found for given email" })
	}

	if (!(await user.matchPassword(password))) {
		return res.status(401).json({ error: "Password is incorrect" })
	}

	const accessToken = generateAccessToken(user, res)
	const refreshToken = generateRefreshToken(user, res)

	user.refreshToken = refreshToken

	await user.save()

	res.status(200).json({ accessToken, refreshToken })
}

export const refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken || req.body.refreshToken
    if (!token) return res.status(401).json({ error: 'No refresh token' })

    try {
        const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decode.id)
        if (!user) return res.status(404).json({ error: "User not found" })
        if (user.refreshToken !== token) return res.status(403).json({ error: "Invalid token" })

        const newAccessToken = generateAccessToken(user, res)

        res.status(200).json({ accessToken: newAccessToken })
    } catch (error) {
        return res.status(403).json({ error: "Error while refreshing token" })
    }
}

export const logout = async (req, res) => {
	const accessToken = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken
	const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
	const user = await User.findById(decode.id)
	if (user) {
		user.refreshToken = '',
			await user.save()
	}

	res.clearCookie("accessToken")
		.clearCookie('refreshToken')
		.json({ message: "User logged out succesfully!" })
}
import jwt from "jsonwebtoken"

export const generateAccessToken = (user, res) => {
	const accessToken = jwt.sign({
		id: user._id, role: user.role
	}, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '5m'
	})

	res.cookie(
		"accessToken", accessToken, {
		httpOnly: true,
		maxAge: 15 * 60 * 1000
	}
	)

	return accessToken
}

export const generateRefreshToken = (user, res) => {
	const refreshToken = jwt.sign({
		id: user._id, role: user.role
	}, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '7d'
	})

	res.cookie(
		"refreshToken", refreshToken, {
		httpOnly: true,
		maxAge: 7 * 24 * 60 * 60 * 1000
	}
	)

	return refreshToken
}
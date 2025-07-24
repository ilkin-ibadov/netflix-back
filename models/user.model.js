import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: [true, "Username is already taken"],
	},
	email: {
		type: String,
		required: true,
		unique: [true, "Email is already taken"],
		match: [
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			"Please enter a valid email address",
		],
	},
	password: {
		type: String,
		required: true,
		minLength: [8, "Password must be at least 8 characters"]
	},
	favoriteMovies: {
		type: Array,
		default: [],
	},
	favoriteShows: {
		type: Array,
		default: [],
	},
	searchHistory: {
		type: Array,
		default: [],
	},
	refreshToken: {
		type: String
	}
}, { timestamps: true });

userSchema.pre('save', async function () {
	if (!this.isModified('password')) return;
	this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.matchPassword = function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;

import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import favoriteRoutes from "./routes/favorite.route.js"

import { connectDB } from "./config/db.js";
import { protect } from "./middleware/auth.middleware.js";

const app = express();
const __dirname = path.resolve();

const allowedOrigins = [
  'https://ilkinibadov.com', // e.g. https://myapp.com
  'https://www.ilkinibadov.com', // e.g. https://www.myapp.com
  'http://localhost:5173', // for React local
  'http://localhost:3000', // optional, for Next.js local
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/tv", tvRoutes);
app.use("/api/v1/search", protect, searchRoutes);
app.use("/api/v1/favorites", protect, favoriteRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(process.env.PORT, () => {
	console.log("Server started at http://localhost:" + process.env.PORT);
	connectDB();
});

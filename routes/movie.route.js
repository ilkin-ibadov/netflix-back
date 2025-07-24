import express from "express";
import {
	getMovieDetails,
	getMoviesByCategory,
	getMovieTrailers,
	getSimilarMovies,
	getTrendingMovie,
} from "../controllers/movie.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", protect, getMovieTrailers);
router.get("/:id/details", protect, getMovieDetails);
router.get("/:id/similar", protect, getSimilarMovies);
router.get("/:category", protect, getMoviesByCategory);

export default router;

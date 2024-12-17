import express from "express";
import {
	getMovieDetails,
	getMoviesByCategory,
	getMovieTrailers,
	getSimilarMovies,
	getTrendingMovie,
} from "../controllers/movie.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", protectRoute, getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", protectRoute, getSimilarMovies);
router.get("/:category", protectRoute, getMoviesByCategory);

export default router;

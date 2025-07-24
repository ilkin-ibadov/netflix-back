import express from "express";
import {
	getSimilarTvs,
	getTrendingTv,
	getTvDetails,
	getTvsByCategory,
	getTvTrailers,
} from "../controllers/tv.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", protect, getTvTrailers);
router.get("/:id/details", protect, getTvDetails);
router.get("/:id/similar", protect, getSimilarTvs);
router.get("/:category", protect, getTvsByCategory);

export default router;

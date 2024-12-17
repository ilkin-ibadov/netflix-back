import express from "express";
import {
	getSimilarTvs,
	getTrendingTv,
	getTvDetails,
	getTvsByCategory,
	getTvTrailers,
} from "../controllers/tv.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", protectRoute, getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", protectRoute, getSimilarTvs);
router.get("/:category", protectRoute, getTvsByCategory);

export default router;

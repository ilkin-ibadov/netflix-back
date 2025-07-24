import express from 'express';
import {
    getFavoriteMovies,
    getFavoriteShows,
    addMovieToFavorites,
    addShowToFavorites,
    removeMovieFromFavorites,
    removeShowFromFavorites,
} from '../controllers/favorite.controller.js';

const router = express.Router();

router.get('/movie', getFavoriteMovies)
router.get('/tv', getFavoriteShows)
router.post('/movie/add', addMovieToFavorites)
router.post('/tv/add', addShowToFavorites)
router.delete('/movie/delete/:movieId', removeMovieFromFavorites);
router.delete('/tv/delete/:showId', removeShowFromFavorites);

export default router;
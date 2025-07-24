import User from '../models/user.model.js';
import { fetchFromTMDB } from '../services/tmdb.service.js';

export const addMovieToFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const { movieId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.favoriteMovies.includes(movieId)) {
            return res.status(400).json({ error: "Movie already in favorites" });
        }

        user.favoriteMovies.push(movieId);
        await user.save();

        res.status(200).json({ message: "Movie added to favorites", favoriteMovies: user.favoriteMovies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addShowToFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const { showId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.favoriteShows.includes(showId)) {
            return res.status(400).json({ error: "Show already in favorites" });
        }

        user.favoriteShows.push(showId);
        await user.save();

        res.status(200).json({ message: "Show added to favorites", favoriteShows: user.favoriteShows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeMovieFromFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const { movieId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.favoriteMovies = user.favoriteMovies.filter(id => id !== movieId);
        await user.save();

        res.status(200).json({ message: "Movie removed from favorites", favoriteMovies: user.favoriteMovies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeShowFromFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const { showId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.favoriteShows = user.favoriteShows.filter(id => id !== showId);
        await user.save();

        res.status(200).json({ message: "Show removed from favorites", favoriteShows: user.favoriteShows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFavoriteMovies = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('favoriteMovies');
        if (!user) return res.status(404).json({ error: "User not found" });

        const favoriteMovieIds = user.favoriteMovies

        const movieDetails = await Promise.all(
            favoriteMovieIds.map(async (movieId) => {
                try {
                    return await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`);
                } catch (error) {
                    console.error(`Failed to fetch movie with ID ${movieId}:`, error.message);
                    return null;
                }
            })
        );
        const filteredMovies = movieDetails.filter(movie => movie !== null);

        res.status(200).json(filteredMovies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getFavoriteShows = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('favoriteShows');
        if (!user) return res.status(404).json({ error: "User not found" });

        const favoriteShowIds = user.favoriteShows;

		const showDetails = await Promise.all(
			favoriteShowIds.map(async (showId) => {
				try {
					return await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${showId}?language=en-US`);
				} catch (error) {
					console.error(`Failed to fetch TV show with ID ${showId}:`, error.message);
					return null;
				}
			})
		);
		const filteredShows = showDetails.filter(show => show !== null);

		res.status(200).json(filteredShows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
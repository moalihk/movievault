import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getMovies = () => axios.get(`${API_URL}/movies`);
export const createMovie = (movie) => axios.post(`${API_URL}/movies`, movie);
export const updateMovie = (id, movie) => axios.put(`${API_URL}/movies/${id}`, movie);
export const deleteMovie = (id) => axios.delete(`${API_URL}/movies/${id}`);

export const getGenres = () => axios.get(`${API_URL}/genres`);
export const createGenre = (genre) => axios.post(`${API_URL}/genres`, genre);
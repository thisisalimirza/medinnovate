import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getEpisodes = async (params = {}) => {
    try {
        const response = await api.get('/episodes/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching episodes:', error);
        throw error;
    }
};

export const getFeaturedEpisodes = async () => {
    try {
        const response = await api.get('/episodes/', { params: { featured: true } });
        return response.data;
    } catch (error) {
        console.error('Error fetching featured episodes:', error);
        throw error;
    }
};

export const getEpisodesByCategory = async (category) => {
    try {
        const response = await api.get('/episodes/', { params: { category } });
        return response.data;
    } catch (error) {
        console.error('Error fetching episodes by category:', error);
        throw error;
    }
};

export const getEpisodeById = async (id) => {
    try {
        const response = await api.get(`/episodes/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching episode:', error);
        throw error;
    }
}; 
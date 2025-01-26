import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import EpisodeCard from '../components/EpisodeCard';
import { getFeaturedEpisodes, getEpisodes } from '../services/api';

const HomePage = () => {
    const [featuredEpisodes, setFeaturedEpisodes] = useState([]);
    const [latestEpisodes, setLatestEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const [featuredData, latestData] = await Promise.all([
                    getFeaturedEpisodes(),
                    getEpisodes({ page_size: 6 })
                ]);
                
                setFeaturedEpisodes(featuredData.results);
                setLatestEpisodes(latestData.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching episodes:', error);
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            {featuredEpisodes.length > 0 && (
                <>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Featured Episodes
                    </Typography>
                    <Grid container spacing={4} sx={{ mb: 8 }}>
                        {featuredEpisodes.map((episode) => (
                            <Grid item xs={12} sm={6} md={4} key={episode.id}>
                                <EpisodeCard episode={episode} />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            <Typography variant="h4" component="h2" gutterBottom>
                Latest Episodes
            </Typography>
            <Grid container spacing={4}>
                {latestEpisodes.map((episode) => (
                    <Grid item xs={12} sm={6} md={4} key={episode.id}>
                        <EpisodeCard episode={episode} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage; 
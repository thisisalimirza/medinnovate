import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button, Chip, CircularProgress, Paper } from '@mui/material';
import { PlayArrow, CalendarToday, Person, Work } from '@mui/icons-material';
import { getEpisodeById } from '../services/api';

const EpisodeDetailPage = () => {
    const { id } = useParams();
    const [episode, setEpisode] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEpisode = async () => {
            try {
                const data = await getEpisodeById(id);
                setEpisode(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching episode:', error);
                setLoading(false);
            }
        };

        fetchEpisode();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!episode) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h5" color="error">
                    Episode not found
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box sx={{ mb: 3 }}>
                    <Chip label={episode.category} color="primary" sx={{ mr: 1 }} />
                    {episode.is_featured && (
                        <Chip label="Featured" color="secondary" />
                    )}
                </Box>

                <Typography variant="h3" component="h1" gutterBottom>
                    {episode.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarToday sx={{ mr: 1 }} />
                        <Typography variant="subtitle1">
                            {new Date(episode.date_published).toLocaleDateString()}
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1" sx={{ mx: 2 }}>•</Typography>
                    <Typography variant="subtitle1">
                        {episode.duration}
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Person sx={{ mr: 1 }} />
                        <Typography variant="h6">
                            {episode.guest_name}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Work sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" color="text.secondary">
                            {episode.guest_title}
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="body1" paragraph>
                    {episode.description}
                </Typography>

                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                    {episode.spotify_url && (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<PlayArrow />}
                            href={episode.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Listen on Spotify
                        </Button>
                    )}
                    {episode.apple_podcast_url && (
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<PlayArrow />}
                            href={episode.apple_podcast_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Listen on Apple Podcasts
                        </Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default EpisodeDetailPage; 
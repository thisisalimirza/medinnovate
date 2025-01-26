import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { PlayArrow, AccessTime } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const EpisodeCard = ({ episode }) => {
    return (
        <Card sx={{ 
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-4px)',
                transition: 'all 0.3s ease-in-out'
            }
        }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>
                    <Chip 
                        label={episode.category}
                        color="primary"
                        size="small"
                        sx={{ mb: 1 }}
                    />
                    {episode.is_featured && (
                        <Chip 
                            label="Featured"
                            color="secondary"
                            size="small"
                            sx={{ ml: 1 }}
                        />
                    )}
                </Box>
                
                <Typography variant="h6" component="h2" gutterBottom>
                    {episode.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {episode.description.length > 150 
                        ? `${episode.description.substring(0, 150)}...` 
                        : episode.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                        {episode.duration}
                    </Typography>
                </Box>
                
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Guest: {episode.guest_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {episode.guest_title}
                </Typography>
            </CardContent>
            
            <Box sx={{ p: 2, pt: 0 }}>
                <Button
                    component={Link}
                    to={`/episodes/${episode.id}`}
                    variant="contained"
                    startIcon={<PlayArrow />}
                    fullWidth
                >
                    Listen Now
                </Button>
            </Box>
        </Card>
    );
};

export default EpisodeCard; 
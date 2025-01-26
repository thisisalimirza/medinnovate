from rest_framework import serializers
from .models import Episode

class EpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = [
            'id', 'title', 'description', 'episode_number',
            'duration', 'date_published', 'spotify_url',
            'apple_podcast_url', 'category', 'is_featured',
            'guest_name', 'guest_title'
        ] 
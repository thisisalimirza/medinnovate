from django.db import models

# Create your models here.

class Episode(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    episode_number = models.IntegerField(unique=True)
    duration = models.CharField(max_length=50)  # e.g., "45 min"
    date_published = models.DateField()
    spotify_url = models.URLField(blank=True)
    apple_podcast_url = models.URLField(blank=True)
    category = models.CharField(max_length=100)
    is_featured = models.BooleanField(default=False)
    guest_name = models.CharField(max_length=200, blank=True, null=True)
    guest_title = models.CharField(max_length=200, blank=True, null=True)
    
    class Meta:
        ordering = ['-episode_number']
    
    def __str__(self):
        return f"Episode {self.episode_number}: {self.title}"

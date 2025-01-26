from django.contrib import admin
from .models import Episode

@admin.register(Episode)
class EpisodeAdmin(admin.ModelAdmin):
    list_display = ('episode_number', 'title', 'guest_name', 'date_published', 'category', 'is_featured')
    list_filter = ('category', 'is_featured', 'date_published')
    search_fields = ('title', 'description', 'guest_name')
    ordering = ('-episode_number',)

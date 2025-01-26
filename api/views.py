from django.shortcuts import render, get_object_or_404
from django.db.models import Count
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Episode
from .serializers import EpisodeSerializer

# Create your views here.

class EpisodeViewSet(viewsets.ModelViewSet):
    queryset = Episode.objects.all()
    serializer_class = EpisodeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Episode.objects.all()
        category = self.request.query_params.get('category', None)
        featured = self.request.query_params.get('featured', None)
        
        if category:
            queryset = queryset.filter(category=category)
        if featured:
            queryset = queryset.filter(is_featured=True)
            
        return queryset

def landing_page(request):
    featured_episodes = Episode.objects.filter(is_featured=True)
    latest_episodes = Episode.objects.all().order_by('-date_published')[:6]
    
    # Get categories and their counts
    categories = Episode.objects.values('category').annotate(
        count=Count('category')
    ).order_by('-count')
    
    category_counts = {
        item['category']: item['count'] for item in categories
    }
    
    # Category descriptions
    category_descriptions = {
        'AI in Healthcare': 'Exploring the impact of artificial intelligence on clinical practice and patient care.',
        'Digital Health': 'The latest in telemedicine, health apps, and digital therapeutics.',
        'Medical Devices': 'Innovative devices transforming patient monitoring and treatment.',
        'Healthcare Startups': 'Stories from founders building the future of healthcare.',
    }
    
    context = {
        'featured_episodes': featured_episodes,
        'latest_episodes': latest_episodes,
        'categories': [item['category'] for item in categories],
        'category_counts': category_counts,
        'category_descriptions': category_descriptions,
        'episode_count': Episode.objects.count(),
    }
    
    return render(request, 'api/index.html', context)

def episode_detail(request, episode_number):
    """
    View function for individual episode pages.
    Displays the episode in an article/blog style format.
    """
    episode = get_object_or_404(Episode, episode_number=episode_number)
    
    context = {
        'episode': episode,
        'meta_description': episode.description[:160],  # First 160 chars for SEO
        'meta_title': f"{episode.title} - Medical Innovation Pod",
    }
    
    return render(request, 'api/episode_detail.html', context)

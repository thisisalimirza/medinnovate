from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EpisodeViewSet

router = DefaultRouter()
router.register(r'episodes', EpisodeViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 
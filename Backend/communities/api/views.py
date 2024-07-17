from .serializers import CommunitySerializer,CommunityStatsSerializer
from rest_framework import generics
from communities.models import Community,CommunityStats
from django.http import Http404
from django.shortcuts import get_object_or_404

class CommunityListCreateView(generics.ListCreateAPIView):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer

class CommunityDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    def get_object(self):
        community_slug = self.kwargs.get('community_slug')
        return get_object_or_404(Community, slug=community_slug)


class CommunityStatsListCreateView(generics.ListCreateAPIView):
    queryset = CommunityStats.objects.all()
    serializer_class = CommunityStatsSerializer

class CommunityStatsDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CommunityStats.objects.all()
    serializer_class = CommunityStatsSerializer
    def get_object(self):
        community_slug = self.kwargs.get('community_slug')
        try:
            community = Community.objects.get(slug=community_slug)
            community_stats = CommunityStats.objects.get(community=community)
        except Community.DoesNotExist:
            raise Http404("Community does not exist")
        
            
        
        return community_stats
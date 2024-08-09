from django.urls import path
from .views import (CommunityListCreateView,CommunityDetailView,
                    CommunityStatsListCreateView,CommunityStatsDetailView
                    
                    )
urlpatterns =[
path('communities/',CommunityListCreateView.as_view(),name='community-list-create'),
path('communities/<str:community_slug>/',CommunityDetailView.as_view(),name='community-detail'),
path('communitiy-stats/',CommunityStatsListCreateView.as_view(),name='community-stats-detail'),
path('community-stats/<str:community_slug>/',CommunityStatsDetailView.as_view(),name='community-stats-detail'),

]
from django.urls import path
from .views import (
    AllianceListCreateView,
    AllianceDetailView,
    AllianceBadgeListCreateView,
    AllianceBadgeDetailView,
    AllianceEventListCreateView,
    AllianceEventDetailView,

    AllianceLevelListCreateView,
    AllianceLevelDetailView,
    AllianceMissionListCreateView,
    AllianceMissionDetailView,
    AllianceStatsListCreateView,
    AllianceStatsDetailView,
    ProfileAllianceView,
)

urlpatterns = [
    path('profile-alliance/<uuid:pk>',ProfileAllianceView.as_view(),name='profile-alliance'),
    # Routes for alliances
    path('alliances/', AllianceListCreateView.as_view(), name='alliance-list-create'),
    path('alliances/<uuid:pk>', AllianceDetailView.as_view(), name='alliance-detail'),
    
    # Routes for alliance stats
    path('alliance-stats/', AllianceStatsListCreateView.as_view(), name='alliance-stats-list-create'),
    path('alliance-stats/<uuid:pk>', AllianceStatsDetailView.as_view(), name='alliance-stats-detail'),

    
    # Routes for alliance badges
    path('alliance-badges/', AllianceBadgeListCreateView.as_view(), name='alliance-badge-list-create'),
    path('alliance-badges/<int:pk>', AllianceBadgeDetailView.as_view(), name='alliance-badge-detail'),

    # Routes for alliance events
    path('alliance-events/', AllianceEventListCreateView.as_view(), name='alliance-event-list-create'),
    path('alliance-events/<int:pk>', AllianceEventDetailView.as_view(), name='alliance-event-detail'),

    # Routes for alliance levels
    path('alliance-levels/', AllianceLevelListCreateView.as_view(), name='alliance-level-list-create'),
    path('alliance-levels/<int:pk>', AllianceLevelDetailView.as_view(), name='alliance-level-detail'),

    # Routes for alliance missions
    path('alliance-missions/', AllianceMissionListCreateView.as_view(), name='alliance-mission-list-create'),
    path('alliance-missions/<int:pk>', AllianceMissionDetailView.as_view(), name='alliance-mission-detail'),

]

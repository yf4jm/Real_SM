from django.urls import path
from .views import (
    ProfileListCreateView,ProfileDetailView,
    ProfileStatsListCreateView,ProfileStatsDetailView,
    ProfileLevelListCreateView,ProfileLevelDetailView,
    ProfileBadgeListCreateView,ProfileBadgeDetailView,
    UserListCreateView,UserDetailView,

    UserProfileView,ProfileInfoView
)
urlpatterns =[
path('profile-info',ProfileInfoView.as_view(),name='profile-info'),

path('profile/',UserProfileView.as_view(),name='profile'),

path('users/',UserListCreateView.as_view(),name='users-list-create'),
path('users/<int:pk>/',UserDetailView.as_view(),name='users-detail'),

path('profiles/',ProfileListCreateView.as_view(),name='profile-list-create'),
path('profiles/<uuid:pk>/',ProfileDetailView.as_view(),name='profile-detail'),

path('profile-stats/',ProfileStatsListCreateView.as_view(),name='profilestats-list-create'),
path('profile-stats/<uuid:profile_uuid>/',ProfileStatsDetailView.as_view(),name='profilestats-detail'),

path('profile-levels/',ProfileLevelListCreateView.as_view(),name='profilelevel-list-create'),
path('profile-levels/<int:pk>/',ProfileLevelDetailView.as_view(),name='profilelevel-detail'),

path('profile-badges/',ProfileBadgeListCreateView.as_view(),name='profilebadge-list-create'),
path('profile-badges/<int:pk>/',ProfileBadgeDetailView.as_view(),name='profilebadge-detail'),



]
from users.models import Profile,ProfileBadge,ProfileLevel,ProfileStats
from users.api.serializers import (ProfileBadgeSerializer,ProfileLevelSerializer,
                                   ProfileSerializer,ProfileStatsSerializer,UserSerializer)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
import re
from rest_framework.permissions import IsAuthenticated
from django.http import Http404

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



class ProfileListCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileStatsListCreateView(generics.ListCreateAPIView):
    queryset = ProfileStats.objects.all()
    serializer_class = ProfileStatsSerializer

class ProfileStatsDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileStatsSerializer

    def get_object(self):
        profile_uuid = self.kwargs.get('profile_uuid')
        try:
            profile = Profile.objects.get(id=profile_uuid)
        except Profile.DoesNotExist:
            raise Http404("Profile does not exist")
        
        try:
            profile_stats = ProfileStats.objects.get(profile=profile)
        except ProfileStats.DoesNotExist:
            raise Http404("ProfileStats does not exist")
        
        return profile_stats


class ProfileLevelListCreateView(generics.ListCreateAPIView):
    queryset = ProfileLevel.objects.all()
    serializer_class = ProfileLevelSerializer

class ProfileLevelDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProfileLevel.objects.all()
    serializer_class = ProfileLevelSerializer


class ProfileBadgeListCreateView(generics.ListCreateAPIView):
    queryset = ProfileBadge.objects.all()
    serializer_class = ProfileBadgeSerializer

class ProfileBadgeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProfileBadge.objects.all()
    serializer_class = ProfileBadgeSerializer   
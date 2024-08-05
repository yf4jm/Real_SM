from users.models import Profile,ProfileBadge,ProfileLevel,ProfileStats
from users.api.serializers import (ProfileBadgeSerializer,ProfileLevelSerializer,
                                   ProfileSerializer,ProfileStatsSerializer,UserSerializer,
                                   UserProfileSerializer)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
import re
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView

#PROFILE PAGE USE
class ProfileInfoView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        try:
            profile = Profile.objects.get(user=self.request.user)
            profile_stats =ProfileStats.objects.get(profile=profile)
            serialized_profile = ProfileSerializer(profile)
            serialized_profile_stats = ProfileStatsSerializer(profile_stats)
            context ={
                "profile": serialized_profile.data,
                "stats":serialized_profile_stats.data
            }
            return Response(context,status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
        except ProfileStats.DoesNotExist:
            return Response({"error": "Profile stats not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
#FOR NAVBAR USE
class UserProfileView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Get the profile of the currently authenticated user
        try:
            profile = Profile.objects.get(user=self.request.user)
        except Profile.DoesNotExist:
            raise PermissionDenied("Profile does not exist for this user.")
        return profile
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
from .serializers import(
    AllianceBadgeSerializer,
    AllianceEventSerializer,AllianceLevelSerializer,AllianceMissionSerializer,AllianceSerializer,
    AllianceStatsSerializer,AllianceMemberSerializer
)
from alliances.models import (
    Alliance,AllianceBadge,AllianceEvent,
    AllianceLevel,AllianceMission,AllianceStats,AllianceMember
)
from django.http import Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
import re
from rest_framework.permissions import IsAuthenticated


class ProfileAllianceView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AllianceMember.objects.all()
    serializer_class = AllianceMemberSerializer
    def get_object(self):
        try:
            profile_uuid = self.kwargs.get('pk')
            allianceMember = AllianceMember.objects.get(profile=profile_uuid)
        except AllianceMember.DoesNotExist:
            raise Http404("this profile doesn't belong to any alliance")
        return allianceMember
            
class AllianceListCreateView(generics.ListCreateAPIView):
    queryset = Alliance.objects.all()
    serializer_class = AllianceSerializer

class AllianceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alliance.objects.all()
    serializer_class = AllianceSerializer

class AllianceBadgeListCreateView(generics.ListCreateAPIView):
    queryset = AllianceBadge.objects.all()
    serializer_class = AllianceBadgeSerializer

class AllianceBadgeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AllianceBadge.objects.all()
    serializer_class = AllianceBadgeSerializer


class AllianceEventListCreateView(generics.ListCreateAPIView):
    queryset = AllianceEvent.objects.all()
    serializer_class = AllianceEventSerializer

class AllianceEventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AllianceEvent.objects.all()
    serializer_class = AllianceEventSerializer


class AllianceLevelListCreateView(generics.ListCreateAPIView):
    queryset = AllianceLevel.objects.all()
    serializer_class = AllianceLevelSerializer

class AllianceLevelDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AllianceLevel.objects.all()
    serializer_class = AllianceLevelSerializer


class AllianceMissionListCreateView(generics.ListCreateAPIView):
    queryset = AllianceMission.objects.all()
    serializer_class = AllianceMissionSerializer

class AllianceMissionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AllianceMission.objects.all()
    serializer_class = AllianceMissionSerializer



class AllianceStatsListCreateView(generics.ListCreateAPIView):
    queryset = AllianceStats.objects.all()
    serializer_class = AllianceStatsSerializer

class AllianceStatsDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AllianceStatsSerializer
    def get_object(self):
        alliance_uuid = self.kwargs.get('pk')
        try:
            alliance = Alliance.objects.get(id=alliance_uuid)
        except Alliance.DoesNotExist:
            raise Http404("Alliance does not exist")
        
        try:
            alliance_stats = AllianceStats.objects.filter(alliance=alliance).first()
        except AllianceStats.DoesNotExist:
            raise Http404("AllianceStats does not exist")
        
        return alliance_stats



from .serializers import(
    AllianceBadgeSerializer,AllianceEventMediaSerializer,
    AllianceEventSerializer,AllianceLevelSerializer,AllianceMissionSerializer,AllianceSerializer,
    AllianceStatsSerializer
)
from alliances.models import (
    Alliance,AllianceBadge,AllianceEvent,
    AllianceEventMedia,AllianceLevel,AllianceMission,AllianceStats
)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
import re
from rest_framework.permissions import IsAuthenticated


class AllianceListCreateView(generics.ListCreateAPIView):
    queryset = Alliance.objects.all()
    serializer_class = AllianceSerializer

class AllianceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alliance.objects.all()
    serializer_class = Alliance



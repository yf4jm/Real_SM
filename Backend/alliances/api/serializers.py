from rest_framework import serializers
from alliances.models import (
    Alliance,AllianceBadge,AllianceEvent,
    AllianceEventMedia,AllianceLevel,AllianceMission,AllianceStats
)

class AllianceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alliance
        fields = '__all__'
class AllianceBadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllianceBadge
        fields = '__all__'

class AllianceEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllianceEvent
        fields = '__all__'

class AllianceEventMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllianceEventMedia
        fields = '__all__'

class AllianceLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllianceLevel
        fields = '__all__'
class AllianceMissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllianceMission
        fields = '__all__'

class AllianceStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllianceStats
        fields = '__all__'


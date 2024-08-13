from rest_framework import serializers
from alliances.models import (
    Alliance,AllianceBadge,AllianceEvent,AllianceMember,
    AllianceLevel,AllianceMission,AllianceStats
)
from communities.api.serializers import CommunitySerializer,CommunityAllianceSerializer
from communities.models import Community
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

class ProfileAllianceSerializer(serializers.ModelSerializer):
    communities = serializers.ListField(child=serializers.SlugField(), write_only=True)
    community_list = CommunityAllianceSerializer(many=True, read_only=True, source='communities')
    class Meta:
        model = Alliance
        fields = ['id','name','description','icon','communities','community_list']

    def create(self, validated_data):
        community_slugs = validated_data.pop('communities', [])
        alliance = Alliance.objects.create(**validated_data)
        
        # Get communities from slugs and set the relationship
        communities = Community.objects.filter(slug__in=community_slugs)
        alliance.communities.set(communities)  # Assuming `communities` is a ManyToManyField
        return alliance

    def update(self, instance, validated_data):
        community_slugs = validated_data.pop('communities', [])
        instance = super().update(instance, validated_data)
        
        # Get communities from slugs and update the relationship
        communities = Community.objects.filter(slug__in=community_slugs)
        instance.communities.set(communities)
        return instance

class AllianceMemberSerializer(serializers.ModelSerializer):
    alliance = ProfileAllianceSerializer(read_only=True)
    class Meta:
        model = AllianceMember
        fields = ['alliance']


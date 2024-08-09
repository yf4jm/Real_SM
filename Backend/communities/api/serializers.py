from rest_framework import serializers
from communities.models import Community,CommunityStats


class CommunityAllianceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = ['id','name','slug','image']
class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = '__all__'

class CommunityStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityStats
        fields = '__all__'
from rest_framework import serializers
from users.models import Profile,ProfileBadge,ProfileLevel,ProfileStats
from django.contrib.auth.models import User



class UserProfileSerializer(serializers.ModelSerializer):
    icon = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'name', 'icon']

    def get_icon(self, obj):
        request = self.context.get('request')
        if request and obj.icon:
            return request.build_absolute_uri(obj.icon.url)
        return obj.icon.url if obj.icon else None
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username',"is_active"]

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id","icon","name","username","email","bio","birth_date","created_on"]
class ProfileBadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileBadge
        fields = '__all__'


class ProfileLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileLevel
        fields = '__all__'

class ProfileStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileStats
        fields = ['contribution_power','coins','level','badges']

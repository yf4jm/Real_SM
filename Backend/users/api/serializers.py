from rest_framework import serializers
from users.models import Profile,ProfileBadge,ProfileLevel,ProfileStats
from django.contrib.auth.models import User



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'icon','alliance']
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username',"is_active"]

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id","icon","name","username","email","bio","birth_date","alliance","created_on"]
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

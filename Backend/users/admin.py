# admin.py
from django.contrib import admin
from .models import Profile, ProfileBadge, ProfileLevel, ProfileStats, Follow

@admin.register(ProfileBadge)
class ProfileBadgeAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['username', 'name', 'email', 'created_on']
    search_fields = ['username', 'name', 'email']
    list_filter = ['created_on']

@admin.register(ProfileLevel)
class ProfileLevelAdmin(admin.ModelAdmin):
    list_display = ['level', 'badge', 'c_requirement', 'acquired_at']
    search_fields = ['badge__name']
    list_filter = ['acquired_at']

@admin.register(ProfileStats)
class ProfileStatsAdmin(admin.ModelAdmin):
    list_display = ['profile', 'level', 'contribution_power', 'coins']
    search_fields = ['profile__username', 'profile__name']
    list_filter = ['level__badge', 'coins']

@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ['follower', 'followed', 'created_on']
    search_fields = ['follower__username', 'followed__username']
    list_filter = ['created_on']

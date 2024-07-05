from django.contrib import admin
from .models import Community,CommunityStats
# Register your models here.
@admin.register(Community)
class CommunityAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'description', 'created_on')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(CommunityStats)
class CommunityStatsAdmin(admin.ModelAdmin):
    list_display = ('community', 'popularity_points')
    search_fields = ('community__name',)

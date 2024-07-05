from django.contrib import admin
from .models import Alliance, AllianceStats,AllianceMission

@admin.register(Alliance)
class AllianceAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_on')
    search_fields = ('name', 'description')
    list_filter = ('created_on',)


@admin.register(AllianceStats)
class AllianceStatsAdmin(admin.ModelAdmin):
    list_display = ('alliance', 'contribution_power', 'popularity_points', 'coins')
    search_fields = ('alliance__name',)
    list_filter = ('alliance',)

@admin.register(AllianceMission)
class AllianceMissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'c_reward', 'coins', 'start_date', 'end_date')
    search_fields = ('name', 'description')


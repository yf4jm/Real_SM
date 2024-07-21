from django.contrib import admin
from .models import (Alliance, AllianceStats,AllianceMission,AllianceMember,AllianceMissionRewardItem,
                     AllianceBadge,AllianceEvent,AllianceLevel
                    )

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


@admin.register(AllianceMember)
class AllianceAllianceMember(admin.ModelAdmin):
    list_display = ('profile','alliance','role','power')
    search_fields = ('profile', 'alliance','power')
    list_filter = ('alliance',)
@admin.register(AllianceMissionRewardItem)
class AllianceMissionRewardItemAdmin(admin.ModelAdmin):
    list_display = ('content_type',)
    list_filter = ('content_type',)

@admin.register(AllianceBadge)
class AllianceBadgeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_on')
    search_fields = ('name',)
    list_filter = ('created_on',)

@admin.register(AllianceLevel)
class AllianceLevelAdmin(admin.ModelAdmin):
    list_display = ('level', 'badge', 'acquired_on')
    search_fields = ('badge__name',)
    list_filter = ('level', 'acquired_on')

@admin.register(AllianceEvent)
class AllianceEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'description')
    search_fields = ('title',)
    list_filter = ('title',)


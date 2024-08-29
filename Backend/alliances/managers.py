from django.db import models

class AllianceManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().prefetch_related("communities")
    
class AllianceStatsManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().select_related("alliance","level").prefetch_related('level__badge')
class AllianceMemberManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().select_related("alliance").prefetch_related('alliance__communities')
    
class AllianceLevelManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().select_related("badge")
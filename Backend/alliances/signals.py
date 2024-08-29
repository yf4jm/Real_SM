from django.db.models.signals import post_save
from django.db.models.signals import m2m_changed
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Alliance,AllianceStats,AllianceMember,AllianceLevel
from django.core.exceptions import ValidationError
@receiver(post_save, sender=Alliance)
def create_Alliance_stats(sender, instance, created, **kwargs):
    if created:
        default_lvl = AllianceLevel.objects.get(level=0)
        AllianceStats.objects.create(alliance=instance,level=default_lvl)
@receiver(m2m_changed, sender=Alliance.communities.through)
def check_alliance_com(sender, instance, action, **kwargs):
    if action in ["post_add", "post_remove", "post_clear"]:
        stats = AllianceStats.objects.get(alliance=instance)
        c_count = stats.comm_count
        current_communities_count = instance.communities.count()
        if current_communities_count > c_count:
            raise ValidationError("You have reached the limit of immigrated communities")


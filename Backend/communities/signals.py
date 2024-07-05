from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Community,CommunityStats
@receiver(post_save, sender=Community)
def create_Community_stats(sender, instance, created, **kwargs):
    if created:
        CommunityStats.objects.create(community=instance)
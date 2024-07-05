from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Alliance,AllianceStats
@receiver(post_save, sender=Alliance)
def create_Alliance_stats(sender, instance, created, **kwargs):
    if created:
        AllianceStats.objects.create(alliance=instance)
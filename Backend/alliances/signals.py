from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Alliance,AllianceStats,AllianceMember
from django.core.exceptions import ValidationError
@receiver(post_save, sender=Alliance)
def create_Alliance_stats(sender, instance, created, **kwargs):
    if created:
        AllianceStats.objects.create(alliance=instance)


@receiver(post_save, sender=AllianceMember)
def ensure_single_owner_per_alliance(sender, instance, created, **kwargs):
    if created and instance.role == 'OWNER':
        alliance = instance.alliance
        existing_owner = AllianceMember.objects.filter(alliance=alliance, role='OWNER').first()
        if existing_owner:
            error_message = "There can't be more than one owner in the alliance."
            raise ValidationError(error_message)


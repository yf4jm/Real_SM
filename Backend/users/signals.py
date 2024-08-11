from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile,ProfileBadge,ProfileStats,ProfileLevel

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
        # Create a Profile for the new User
        if created:
            profile= Profile.objects.create(user=instance,username=instance.username,name=instance.username)
            # # Assign the default level to the ProfileStats
            level = ProfileLevel.objects.get(level=1)
            if level:
                profile_stats = ProfileStats.objects.create(profile=profile, level=level)
            # Add the badge associated with the level
                if level.badge:
                    profile_stats.badges.add(level.badge)
                    profile_stats.save()

@receiver(post_save, sender=ProfileStats)
def update_profile_badge(sender, instance, created, **kwargs):
    if not created:
        next_level = ProfileLevel.objects.filter(c_requirement__lte=instance.contribution_power).order_by('-c_requirement').first()
        if next_level and instance.level != next_level:
            ProfileStats.objects.filter(pk=instance.pk).update(level=next_level)
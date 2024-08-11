from django.db import models
from django.contrib.auth.models import User
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid

class ProfileBadge(models.Model):
    name = models.CharField(max_length=50, unique=True)
    icon = models.ImageField(null=True, blank=True)
    
    def __str__(self):
        return self.name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    icon = models.ImageField(default="no_icon.png", upload_to='profile_icons/')
    name = models.CharField(max_length=50, default="")
    username = models.SlugField(max_length=50)
    email = models.EmailField(max_length=50, blank=True, null=True, validators=[EmailValidator])
    bio = models.CharField(max_length=160, blank=True, null=True, default="")
    birth_date = models.DateField(blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def clean(self):
        if self.username and not self.username.isalnum():
            raise ValidationError(_('Username must contain only alphanumeric characters.'))
        if self.email and Profile.objects.filter(email=self.email).exclude(id=self.id).exists():
            raise ValidationError(_('A profile with this email already exists.'))

    def __str__(self):
        return str(self.username)

    class Meta:
        ordering = ['-created_on']
        constraints = [
            models.UniqueConstraint(fields=['user'], name='unique_user_profile')
        ]

class ProfileLevel(models.Model):
    level = models.IntegerField(default=0, null=True, blank=True)
    badge = models.OneToOneField(ProfileBadge, on_delete=models.DO_NOTHING)
    c_requirement = models.FloatField(default=0, null=True, blank=True)
    acquired_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    def __str__(self):
        return "lvl"+str(self.level)

class ProfileStats(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)
    level = models.ForeignKey(ProfileLevel, null=True, blank=True, on_delete=models.CASCADE)
    contribution_power = models.FloatField(default=0.0)
    coins = models.IntegerField(default=0, null=True, blank=True)
    badges = models.ManyToManyField(ProfileBadge, blank=True)

    def update_badge(self):
        next_badge = ProfileBadge.objects.filter(profilelevel__c_requirement__lte=self.contribution_power).order_by('-profilelevel__c_requirement').first()
        if next_badge and (not self.badges.exists() or next_badge.profilelevel.c_requirement > self.badges.first().profilelevel.c_requirement):
            self.level.badge = next_badge
            self.level.save()

class Follow(models.Model):
    follower = models.ForeignKey(Profile, related_name="follower", on_delete=models.CASCADE)
    followed = models.ForeignKey(Profile, related_name="followed", on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        unique_together = ('follower', 'followed') 

    def clean(self):
        if self.follower == self.followed:
            raise ValidationError("A profile cannot follow itself.")

    def __str__(self):
        return f"{self.follower.username} follows {self.followed.username}"

from django.db import models
from alliances.models import AllianceMission
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
# Create your models here.
class Border(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024)
    image = models.ImageField(upload_to='borders/')
    missions = GenericRelation(AllianceMission)

    def __str__(self):
        return self.name

class Sticker(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1024)
    image = models.ImageField(upload_to='stickers/')
    missions = GenericRelation(AllianceMission)

    def __str__(self):
        return self.name

#make a Background class
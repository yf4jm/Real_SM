from django.db import models
from users.models import Profile
# Create your models here.
class Action(models.TextChoices):
    publication = 'PUBLICATION','publication'
class Log(models.Model):
    user = models.ForeignKey(Profile,on_delete=models.CASCADE,null=False,blank=False,default=None)
    type = models.CharField(choices=Action.choices,default=Action.publication,max_length=35)
    data = models.JSONField(null=True,blank=True,default=None)
    created_on = models.DateTimeField(auto_now_add=True)

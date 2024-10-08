# Generated by Django 4.0.2 on 2024-07-03 15:11

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('icon', models.ImageField(default='no_icon.png', upload_to='profile_icons/')),
                ('name', models.CharField(default='', max_length=50)),
                ('username', models.SlugField()),
                ('email', models.EmailField(blank=True, max_length=50, null=True, validators=[django.core.validators.EmailValidator])),
                ('bio', models.CharField(blank=True, default='', max_length=160, null=True)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True, null=True)),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_on'],
            },
        ),
        migrations.CreateModel(
            name='ProfileBadge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('icon', models.ImageField(blank=True, null=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='ProfileLevel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.IntegerField(blank=True, default=0, null=True)),
                ('c_requirement', models.FloatField(blank=True, default=0, null=True)),
                ('acquired_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('badge', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, to='users.profilebadge')),
            ],
        ),
        migrations.CreateModel(
            name='ProfileStats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contribution_power', models.FloatField(default=0.0)),
                ('coins', models.IntegerField(blank=True, default=0, null=True)),
                ('badges', models.ManyToManyField(blank=True, to='users.ProfileBadge')),
                ('level', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.profilelevel')),
                ('profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='users.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True, null=True)),
                ('followed', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followers', to='users.profile')),
                ('follower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following', to='users.profile')),
            ],
        ),
        migrations.AddConstraint(
            model_name='profile',
            constraint=models.UniqueConstraint(fields=('user',), name='unique_user_profile'),
        ),
        migrations.AlterUniqueTogether(
            name='follow',
            unique_together={('follower', 'followed')},
        ),
    ]

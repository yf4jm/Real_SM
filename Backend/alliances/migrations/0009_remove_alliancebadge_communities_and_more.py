# Generated by Django 4.0.2 on 2024-07-05 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0001_initial'),
        ('alliances', '0008_alter_alliancebadge_communities'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alliancebadge',
            name='communities',
        ),
        migrations.AddField(
            model_name='alliance',
            name='communities',
            field=models.ManyToManyField(blank=True, to='communities.Community'),
        ),
    ]

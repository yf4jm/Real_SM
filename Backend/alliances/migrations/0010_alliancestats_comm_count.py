# Generated by Django 4.0.2 on 2024-07-05 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alliances', '0009_remove_alliancebadge_communities_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='alliancestats',
            name='comm_count',
            field=models.IntegerField(default=1),
        ),
    ]

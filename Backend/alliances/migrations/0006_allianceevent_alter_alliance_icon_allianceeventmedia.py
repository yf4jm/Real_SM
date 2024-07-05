# Generated by Django 4.0.2 on 2024-07-04 19:30

from django.db import migrations, models
import django.db.models.deletion
import django_quill.fields
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('alliances', '0005_alliancemission_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AllianceEvent',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', django_quill.fields.QuillField()),
                ('media', models.ImageField(upload_to='alliance_event_media/')),
            ],
        ),
        migrations.AlterField(
            model_name='alliance',
            name='icon',
            field=models.ImageField(blank=True, default='alliance.png', null=True, upload_to='alliance_icons/'),
        ),
        migrations.CreateModel(
            name='AllianceEventMedia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='alliance_event_media/')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='media_items', to='alliances.allianceevent')),
            ],
        ),
    ]

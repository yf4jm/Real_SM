# Generated by Django 4.0.2 on 2025-02-27 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('PUBLICATION', 'publication')], default='PUBLICATION', max_length=35)),
                ('data', models.JSONField(blank=True, default=None, null=True)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]

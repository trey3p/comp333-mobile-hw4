# Generated by Django 4.0.3 on 2022-04-15 03:52

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_album_songs'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='songs',
            field=models.JSONField(default=list),
        ),
        migrations.AlterField(
            model_name='rating',
            name='rating',
            field=models.IntegerField(validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(0)]),
        ),
    ]

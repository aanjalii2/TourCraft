# Generated by Django 5.0.3 on 2024-05-04 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0004_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='created_at',
            field=models.DateField(auto_now_add=True),
        ),
    ]

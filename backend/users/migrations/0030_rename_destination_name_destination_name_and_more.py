# Generated by Django 5.0.6 on 2024-05-21 12:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0029_rename_destination_name_booking_destination_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='destination',
            old_name='destination_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='trip',
            old_name='destination_name',
            new_name='destination',
        ),
    ]
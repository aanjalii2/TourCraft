# Generated by Django 5.0.3 on 2024-04-15 07:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_booking_phonenumber'),
    ]

    operations = [
        migrations.RenameField(
            model_name='booking',
            old_name='user',
            new_name='email',
        ),
        migrations.RenameField(
            model_name='booking',
            old_name='phonenumber',
            new_name='phone',
        ),
    ]
# Generated by Django 5.0.3 on 2024-05-02 03:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_remove_customuser_email_verification_token'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='email_verified',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='username',
        ),
    ]
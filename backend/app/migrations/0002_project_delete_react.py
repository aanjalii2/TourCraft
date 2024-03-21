# Generated by Django 5.0.3 on 2024-03-13 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('employee', models.CharField(max_length=30)),
                ('department', models.CharField(max_length=200)),
            ],
        ),
        migrations.DeleteModel(
            name='React',
        ),
    ]

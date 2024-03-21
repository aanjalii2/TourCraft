# app/models.py

from django.db import models

class User(models.Model):

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    confrim_password = models.CharField(max_length=100, default='')
    contact_number = models.CharField(max_length=20)
    nationality = models.CharField(max_length=100)

    def __str__(self):
        return self.username

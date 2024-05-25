# app/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

from .manager import UserManager


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        TRAVELER = "TRAVELER", "Traveler"
        

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
   
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    confirm_password = models.CharField(max_length=100, default='')
    contact_number = models.CharField(max_length=20)
    nationality = models.CharField(max_length=100)
    role=models.CharField(max_length=20, choices=Role.choices)

    USERNAME_FIELD="email"
    REQUIRED_FIELDS=[]

    objects= UserManager()

    def __str__(self):
        return self.email
     

class Destination(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='destination_images')
    def __str__(self):
        return self.name

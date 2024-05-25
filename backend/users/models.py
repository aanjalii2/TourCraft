from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models

from .manager import CustomUserManager


class CustomUser(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        TRAVELER = "TRAVELER", "Traveler"

    username= None
    first_name=None
    last_name=None
   
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=20)
    phonenumber = models.CharField(max_length=20, null=True, blank=True)
    nationality = models.CharField(max_length=100, null=True, blank=True)
    role = models.CharField(max_length=20, choices=Role.choices)

    USERNAME_FIELD="email"
    REQUIRED_FIELDS=[]

    objects= CustomUserManager()

    def __str__(self):
        return self.email

class Destination(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='media/')

    def __str__(self):
        return self.name

class Trip(models.Model):
  destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
  trip_duration = models.CharField(max_length=100)
  max_altitude = models.CharField(max_length=50, blank=True)
  trip_type = models.CharField(max_length=255, blank=True)
  transport = models.CharField(max_length=255, blank=True)
  cost = models.DecimalField(max_digits=10, decimal_places=2)

  def __str__(self):
    return f"{self.destination.name} - {self.trip_duration}"

class Booking(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20, null=True, blank=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"{self.user.email} booked {self.destination.name} on {self.date}"

class Payment(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='payments')
    pidx = models.CharField(max_length=100)
    paymentURL = models.URLField()
    status = models.CharField(max_length=100, default="PENDING", choices=(("PENDING", "PENDING"), ("SUCCESS", "SUCCESS"), ("FAILED", "FAILED")))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment for {self.pidx} ({self.amount})"

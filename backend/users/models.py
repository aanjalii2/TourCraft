from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import CustomUserManager
from django.conf import settings


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

class Booking(models.Model):
    user = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, null=True, blank=True)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f"booking from {self.user}"

# class Booking(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
#     destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
#     date = models.DateField()

#     def __str__(self):
#         return f"{self.user.email} booked {self.destination.name} on {self.date}"
    

# Create your models here.
class Payment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for {self.booking}"

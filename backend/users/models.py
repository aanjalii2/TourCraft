from django.db import models
from django.contrib.auth.models import AbstractUser
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
    destination_name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='media/')
    def __str__(self):
        return self.destination_name

class Trip(models.Model):
  destination_name = models.ForeignKey(Destination, on_delete=models.CASCADE)
  trip_duration = models.CharField(max_length=100)
  max_altitude = models.CharField(max_length=50, blank=True)
  trip_type = models.CharField(max_length=255, blank=True)
  transport = models.CharField(max_length=255, blank=True)
  cost = models.CharField(max_length=100)

  def __str__(self):
    return self.destination_name.destination_name

class Booking(models.Model):
    user = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, null=True, blank=True)
    destination_name = models.ForeignKey(Destination, on_delete=models.CASCADE)
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
    return_url = models.URLField()
    website_url = models.URLField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    Booking_id = models.CharField(max_length=100)
    destination_name = models.CharField(max_length=100)
    customer_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for {self.purchase_order_name} ({self.amount})"

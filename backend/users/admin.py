from django.contrib import admin

from .models import Booking, CustomUser, Destination, Payment, Trip


class UserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ['id', 'name', 'email', 'phonenumber', 'nationality']
admin.site.register(CustomUser, UserAdmin)

class DestinationAdmin(admin.ModelAdmin):
    model = Destination 
    list_display = ['id', 'name', 'description', 'image']
admin.site.register(Destination, DestinationAdmin)

class BookingAdmin(admin.ModelAdmin):
    model = Booking
    list_display = ['id', 'user', 'phone', 'destination', 'date', 'cost']
admin.site.register(Booking, BookingAdmin)

class TripAdmin(admin.ModelAdmin):
    model = Trip
    list_display = ['id', 'destination', 'trip_duration', 'max_altitude', 'trip_type', 'transport', 'cost']
admin.site.register(Trip, TripAdmin)
class PaymentAdmin(admin.ModelAdmin):
    model = Payment
    list_display = ['id', 'amount', 'created_at', 'booking_id', 'paymentURL']
admin.site.register(Payment, PaymentAdmin)


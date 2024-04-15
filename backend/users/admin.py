from django.contrib import admin
from .models import CustomUser
from .models import Destination, Booking

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ['id', 'name', 'email', 'phonenumber', 'nationality']
admin.site.register(CustomUser, UserAdmin)




# Register your models here.
class DestinationAdmin(admin.ModelAdmin):
    model = Destination 
    list_display = ['id', 'name', 'description', 'image']
    fieldsets = (
        (None, {'fields': ('name', 'description', 'image')}),
        ('Important dates', {'fields': ('created_at',)}),
    )

admin.site.register(Destination, DestinationAdmin)
class BookingAdmin(admin.ModelAdmin):
    model = Booking
    list_display = ['id', 'user', 'phone', 'destination', 'date']

admin.site.register(Booking, BookingAdmin)


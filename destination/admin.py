from django.contrib import admin
from .models import Destination

# Register your models here.
class DestinationAdmin(admin.ModelAdmin):
    model = Destination 
    list_display = ['name', 'description', 'image']
    fieldsets = (
        (None, {'fields': ('name', 'description', 'image')}),
        ('Important dates', {'fields': ('created_at',)}),
    )

admin.site.register(Destination, DestinationAdmin)

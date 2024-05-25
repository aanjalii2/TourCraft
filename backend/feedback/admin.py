from django.contrib import admin

from .models import Feedback


class FeedbackAdmin(admin.ModelAdmin):
    model = Feedback
    

admin.site.register(Feedback, FeedbackAdmin)
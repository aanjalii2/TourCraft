# backend/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('app.urls')),
    # path('app/login/', include('app.urls')),

    # path('login/', include('app.urls')),
    # Other URL patterns for your project
]

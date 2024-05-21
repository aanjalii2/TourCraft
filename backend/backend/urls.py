# # backend/urls.py

# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('app/', include('app.urls')),
# ]

from django.contrib import admin
from django.urls import path,include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
   
    path('feedback/', include('feedback.urls')),
    # path('khalti/', include('khalti.urls')),
    # path('verification/', include('verify_email.urls')),
]

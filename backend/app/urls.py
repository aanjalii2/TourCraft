# app/urls.py

from django.urls import path
from .views import UserCreateAPIView,user_login
from .views import check_username


urlpatterns = [
    path('signup/', UserCreateAPIView.as_view(), name='signup'),
    # path('login/', UserCreateAPIView.as_view(), name='login'),
    path('api/check-username/', check_username, name='check_username'),
    path('login/', user_login, name='user-login'),
]

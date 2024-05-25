from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views
from .views import (BookingListCreateAPIView, CreateCheckoutSession,
                    CustomUserViewSet, DestinationDeleteAPIView,
                    DestinationListAPIView, LoginViewSet, TripListView,
                    UserView, display_images, get_specific_user, logout)

# from .views import VerifyEsewa

router= DefaultRouter()
router.register("Customuser",CustomUserViewSet)

urlpatterns = [
    path("api/",include(router.urls)),
    path("api/auth_user/",UserView.as_view(), name="auth_user"),
    path("login/", LoginViewSet.as_view({'post':'create'}),name='login'),
    path('api/user/', get_specific_user , name='user'),
    path('logout/',logout, name='logout'),
    path('destinations/', DestinationListAPIView.as_view(), name='destination-list'),

    # path('verify-email/<str:email>/<uuid:token>/', views.verify_email, name='verify_email'),
    path('destinations/<int:destination_id>/', DestinationDeleteAPIView.as_view(), name='destination-delete'),
    path('images/', display_images, name = 'images'),
    path('bookings/', BookingListCreateAPIView.as_view(), name='booking-list'),
    path('users/bookings/<str:email>/', views.user_bookings, name='user_bookings'),
    path('bookings/<int:booking_id>/initiate_payment/', views.initiate_payment, name='initiate_payment'),
    path('trips/', TripListView.as_view()),
    path('trips/<str:destination_name>/', TripListView.as_view(), name='trip_by_destination'),
    path(
        "bookings/<int:booking_id>/create-checkout-session/",
        CreateCheckoutSession.as_view(),
        name="create-checkout-session",
    ),
    # path("verify-email/", views.verify_email, name="verify-email"),
    # path("resend-otp", views.resend_otp, name="resend-otp"), 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
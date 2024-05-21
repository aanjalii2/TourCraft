from django.urls import path ,include 
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet,LoginViewSet, UserView, get_specific_user
from .views import DestinationListAPIView, DestinationDeleteAPIView, display_images, logout
from .views import BookingListCreateAPIView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include
from . import views
from .views import TripListView
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
    path('trips/', TripListView.as_view()),
    path('trips/<str:destination_name>/', TripListView.as_view(), name='trip_by_destination'),
    path('api/payment/initiate/', views.initiate_payment),
    # path("verify-email/", views.verify_email, name="verify-email"),
    # path("resend-otp", views.resend_otp, name="resend-otp"), 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

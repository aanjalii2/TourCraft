from django.urls import path ,include 
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet,LoginViewSet
from .views import DestinationListAPIView, DestinationDeleteAPIView, display_images
from .views import BookingListCreateAPIView
from django.conf import settings
from django.conf.urls.static import static
# from .views import VerifyEsewa



router= DefaultRouter()
router.register("Customuser",CustomUserViewSet)

urlpatterns = [
    path("api/",include(router.urls)),
    path("login/", LoginViewSet.as_view({'post':'create'}),name='login'),
    # path('logout/', LogoutView.as_view(), name='logout'),
    path('destinations/', DestinationListAPIView.as_view(), name='destination-list'),
    
    path('destinations/<int:destination_id>/', DestinationDeleteAPIView.as_view(), name='destination-delete'),
    path('images/', display_images, name = 'images'),
    path('bookings/', BookingListCreateAPIView.as_view(), name='booking-list'),
    # path('bookings/<int:pk>/', BookingRetrieveUpdateDestroyAPIView.as_view(), name='booking-detail'),
    # path("verify-esewa",VerifyEsewa.as_view(),name="verify_esewa"),

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



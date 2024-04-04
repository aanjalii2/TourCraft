
from django.urls import path
from .views import DestinationListAPIView, DestinationDeleteAPIView


urlpatterns = [
    path('destinations/', DestinationListAPIView.as_view(), name='destination-list'),
    path('destinations/<int:destination_id>/', DestinationDeleteAPIView.as_view(), name='destination-delete'),

]

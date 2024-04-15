from django.urls import path
from .views import FeedbackListCreateAPIView, FeedbackRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('feedback/', FeedbackListCreateAPIView.as_view(), name='feedback-list'),
    path('feedback/<int:pk>/', FeedbackRetrieveUpdateDestroyAPIView.as_view(), name='feedback-detail'),
]

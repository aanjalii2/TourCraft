from django.urls import path ,include 
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet,LoginViewSet

router= DefaultRouter()
router.register("Customuser",CustomUserViewSet)

urlpatterns = [
    path("api/",include(router.urls)),
    path("api/login/", LoginViewSet.as_view({'post':'create'}),name='login'),

]
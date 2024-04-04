from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Destination
from .serializer import DestinationSerializer
from rest_framework.permissions import IsAdminUser


class DestinationListAPIView(ListCreateAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Destination.objects.all()
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Destination created successfully."}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DestinationDeleteAPIView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, destination_id):
        try:
            destination = Destination.objects.get(id=destination_id)
            destination.delete()
            return Response({"message": "Destination deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Destination.DoesNotExist:
            return Response({"message": "Destination not found."}, status=status.HTTP_404_NOT_FOUND)

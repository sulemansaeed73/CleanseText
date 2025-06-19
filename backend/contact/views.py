from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer
# Create your views here.


@api_view(['POST'])
def contact(request):
    print("Incoming",request)
    serializer = ContactSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "Contact form submitted successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)
    
    return Response({
        "errors": serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

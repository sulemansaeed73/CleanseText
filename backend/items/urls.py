from .views import fileUpload
from django.urls import path

urlpatterns = [path("fileUpload", fileUpload)]

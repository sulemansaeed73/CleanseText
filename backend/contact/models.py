from django.db import models

# Create your models here.

class Contact(models.Model):
    name=models.CharField(max_length=1000)
    email=models.EmailField(max_length=1000)
    number = models.CharField(max_length=1000,blank=True, null=True)
    location=models.CharField(max_length=1000,blank=True, null=True)
    topic=models.CharField(max_length=100)
    description=models.CharField(max_length=10000)

def __str__(self):
    return self.name

from django.db import models
from users.models import User

# Create your models here.


class Item(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="items")
    name = models.CharField(max_length=100, null=True, blank=True)
    type = models.CharField(max_length=100, null=True, blank=True)
    file = models.FileField(upload_to="uploads/", null=True, blank=True)

    def __str__(self):
        return self.name

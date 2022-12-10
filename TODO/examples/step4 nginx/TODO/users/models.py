from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    username = models.CharField(max_length=64)
    age = models.PositiveIntegerField()
    bio = models.TextField(max_length=500)
    email = models.CharField(max_length=64, unique=True)

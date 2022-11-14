from django.db import models
from users.models import User

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=50)
    href_repository = models.TextField(blank=True, null=True)
    users = models.ManyToManyField(User)


class Todo(models.Model):
    project = models.CharField(max_length=50)
    note = models.CharField(max_length=50)
    note_text = models.TextField(blank=True, null=True)
    create = models.DateTimeField(auto_now_add=True, editable=False)
    update = models.DateTimeField(auto_now=True, editable=False)
    user_create = models.ForeignKey(User, on_delete=models.CASCADE)
    activate = models.BooleanField(default=False)
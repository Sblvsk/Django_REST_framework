from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet


from .models import User, Project, Todo
from .serializers import ProjectSerializer, TodoSerializer



class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

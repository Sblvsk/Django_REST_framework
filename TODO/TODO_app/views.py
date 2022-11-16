from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response

from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilterSet
from .models import User, Project, Todo
from .serializers import ProjectSerializer, TodoSerializer



class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filterset_class = ProjectFilterSet


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filterset_fields = ['project']
    #filterset_class = TodoFilterSet


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.activate = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

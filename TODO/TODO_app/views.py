from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response

from rest_framework.viewsets import ModelViewSet


from .models import User, Project, Todo
from .serializers import ProjectSerializer, TodoSerializer



class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.activate = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)



    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #
    # def perform_destroy(self, instance):
    #     instance.delete()


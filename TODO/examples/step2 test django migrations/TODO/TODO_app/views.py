from django.shortcuts import render
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from rest_framework.viewsets import ModelViewSet

from .filters import ProjectFilterSet  #, TodoFilterSet
from .models import User, Project, Todo
from .serializers import ProjectSerializer, TodoSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10

class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filterset_class = ProjectFilterSet
    pagination_class = ProjectLimitOffsetPagination





class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    # filterset_class = TodoFilterSet
    filterset_fields = ['project']
    pagination_class = TodoLimitOffsetPagination


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.activate = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

from django.shortcuts import render
from rest_framework.generics import ListAPIView
from TODO_app.models import Project
from projectAPIapp.serializers import ProjectModelSerializer, ProjectFullModelSerializer


class ProjectListAPIView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2' and self.request.user.is_superuser:
            return ProjectFullModelSerializer
        return ProjectModelSerializer

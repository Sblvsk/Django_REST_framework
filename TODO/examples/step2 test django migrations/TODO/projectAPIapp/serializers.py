from rest_framework.serializers import ModelSerializer
from TODO_app.models import Project

class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ('name',)

class ProjectFullModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'users')
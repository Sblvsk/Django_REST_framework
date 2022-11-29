from rest_framework.serializers import ModelSerializer
from .models import User, Project, Todo


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ('__all__')


class ProjectSerializerBase(ModelSerializer):
    class Meta:
        model = Project
        fields = ('name',)


class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = ('__all__')


class TodoSerializerBase(ModelSerializer):
    class Meta:
        model = Todo
        fields = ('note',)

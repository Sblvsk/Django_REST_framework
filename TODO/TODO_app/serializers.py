from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, StringRelatedField
from .models import User, Project, Todo



class ProjectSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'

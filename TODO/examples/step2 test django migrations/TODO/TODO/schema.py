import graphene
from graphene_django import DjangoObjectType
from TODO_app.models import Project, Todo
from users.models import User


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoType)
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))


    def resolve_all_todos(root, info):
        return Todo.objects.all()

    def resolve_all_users(root, info):
        return UserType.objects.all()

    def resolve_all_projects(root, info):
        return ProjectType.objects.all()

    def resolve_projects_by_id(root, info, id):
        try:
            return Project.objects.get(pk=id)
        except Project.DoesNotExist:
            return None

schema = graphene.Schema(query=Query)

from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=0)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        
        
        


class TicketSerializer(serializers.ModelSerializer):
    TicketProject = serializers.StringRelatedField()
    TicketAssignedTo = serializers.StringRelatedField()
    TicketSubmittedBy = serializers.StringRelatedField()
            
    class Meta:
        model = Ticket
        fields = '__all__'
        
class TicketSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'        
        
              
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        
        
class DevUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = DevUser
        fields = '__all__'
        

class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'id')
        

        


from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager,User
from datetime import datetime
from django.utils import timezone

class Project(models.Model):
    class PStatus(models.TextChoices):
        Finished = 'FI', "Finished"
        InProgress = 'IP', "InProgress"
        ComingUp = 'CU', "Coming Up"
    ProjectId = models.AutoField(primary_key=True)
    ProjectName = models.CharField(max_length=30)
    ProjectDescription = models.CharField(max_length=200)
    ProjectStatus = models.CharField(max_length=20, choices=PStatus.choices)
   
    def __str__(self):
        return self.ProjectName    

class DevUser (models.Model):
    class UserRoles(models.TextChoices):
        Developer = 'Developer', "DEV"
        Senior = 'Senior', "SEN"
        Admin = 'Admin', "ADM"
    UserId = models.AutoField(primary_key=True)
    UserPoints = models.IntegerField(default=0)
    devUserName = models.CharField(max_length=20, blank=True, null=True, default='')
    MonthlyPoints = models.IntegerField(default=0)
    last_reset = models.DateTimeField(null=True,blank=True)
    UserRole = models.TextField(max_length=12, choices=UserRoles.choices, default=UserRoles.Developer)
    UserProject = models.ManyToManyField(Project, blank=True, related_name='userprojects')
    user = models.ForeignKey(User ,null = False, on_delete=models.CASCADE)

    def reset_points_monthly(self):
        now = datetime.now()
        if now.day == 1 and now.hour == 0 and now.minute == 0 and now.second == 0:
            self.MonthlyPoints = 0
            self.last_reset = now
            self.save()

    
    def save(self, *args, **kwargs):
        if not self.devUserName:
            self.devUserName = self.user.username
        super().save(*args, **kwargs)

    
    def __str__(self):
        return str(self.user)
    
    
class Ticket(models.Model): 
    class TPriority(models.TextChoices):
        VHigh = 'VH', "Very Important"
        High = 'H', "Important"
        Medium = 'M', "Medium"
        Low = 'L', "Low"
    class TStatus(models.TextChoices):
        Open = 'OP', "Open"
        Pending = 'PE', "Pending"
        Closed = 'CL', "Closed"
        
    TicketId = models.AutoField(primary_key=True)
    TicketDescription = models.CharField(max_length=255)
    TicketObserved=models.CharField(max_length=1000, blank=True, null=True)
    TicketExpected = models.CharField(max_length=1000, blank=True, null=True)
    TicketStatus = models.CharField(max_length=20, choices=TStatus.choices )
    TicketPriority = models.CharField(max_length=16,choices=TPriority.choices)
    TicketPoints = models.IntegerField(default=1,
                                       validators=[MaxValueValidator(10),
                                                   MinValueValidator(1)
        
    ])
    TicketDateOpened = models.DateTimeField(blank=True, null=True)
    TicketDateAssigned = models.DateTimeField(blank=True, null=True)
    TicketDateClosed = models.DateTimeField(auto_now_add = False , blank=True, null=True)
    TicketCodeLocation = models.CharField(max_length=255, blank=True, null=True)
    TicketProject = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tproject", null=True)
    TicketAssignedTo = models.ForeignKey(User, on_delete=models.CASCADE, related_name="assignedto", default=None, null=True, blank=True)
    TicketSubmittedBy = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Ticket_submitted_by", default=None, null = True)

    
    def __str__(self):
        return 'Ticket ' + str(self.TicketId)
    
    
    

    

    

    
    
    
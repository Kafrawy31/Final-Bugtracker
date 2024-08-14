from django.test import TestCase
from django.utils import timezone
from .models import Project, DevUser, Ticket

class ProjectModelTest(TestCase):
    
    def setUp(self):
        self.project = Project.objects.create(ProjectName='Test Project', 
                                               ProjectDescription='Test Project Description',
                                               ProjectStatus=Project.PStatus.InProgress)
        
    def test_project_string_representation(self):
        self.assertEqual(str(self.project), self.project.ProjectName)
        
    def test_project_status_choices(self):
        choices = dict(self.project.PStatus.choices)
        self.assertDictEqual(choices, {'FI': 'Finished', 'IP': 'InProgress', 'CU': 'Coming Up'})
        
    def test_project_creation(self):
        self.assertIsInstance(self.project, Project)
        
        
class DevUserModelTest(TestCase):
    
    def setUp(self):
        self.user = DevUser.objects.create(UserPoints=0,
                                            devUserName='Test User',
                                            MonthlyPoints=0,
                                            UserRole=DevUser.UserRoles.Developer)
        
    def test_dev_user_string_representation(self):
        self.assertEqual(str(self.user), str(self.user.user))
        
    def test_dev_user_roles_choices(self):
        choices = dict(self.user.UserRoles.choices)
        self.assertDictEqual(choices, {'Developer': 'DEV', 'Senior': 'SEN', 'Admin': 'ADM'})
        
    def test_dev_user_creation(self):
        self.assertIsInstance(self.user, DevUser)
        
    def test_dev_user_reset_points_monthly(self):
        self.user.MonthlyPoints = 5
        self.user.reset_points_monthly()
        self.assertEqual(self.user.MonthlyPoints, 0)
        
    def test_dev_user_save_method(self):
        self.user.save()
        self.assertEqual(self.user.devUserName, self.user.user.username)
        
        
class TicketModelTest(TestCase):
    
    def setUp(self):
        self.project = Project.objects.create(ProjectName='Test Project', 
                                               ProjectDescription='Test Project Description',
                                               ProjectStatus=Project.PStatus.InProgress)
        
        self.ticket = Ticket.objects.create(TicketDescription='Test Ticket',
                                            TicketStatus=Ticket.TStatus.Open,
                                            TicketPriority=Ticket.TPriority.Medium,
                                            TicketPoints=5,
                                            TicketProject=self.project)
        
        self.user = DevUser.objects.create(UserPoints=0,
                                            devUserName='Test User',
                                            MonthlyPoints=0,
                                            UserRole=DevUser.UserRoles.Developer)
        
    def test_ticket_string_representation(self):
        self.assertEqual(str(self.ticket), 'Ticket ' + str(self.ticket.TicketId))
        
    def test_ticket_priority_choices(self):
        choices = dict(self.ticket.TPriority.choices)
        self.assertDictEqual(choices, {'VH': 'Very Important', 'H': 'Important', 'M': 'Medium', 'L': 'Low'})
        
    def test_ticket_status_choices(self):
        choices = dict(self.ticket.TStatus.choices)
        self.assertDictEqual(choices, {'OP': 'Open', 'PE': 'Pending', 'CL': 'Closed'})
        
    def test_ticket_creation(self):
        self.assertIsInstance(self.ticket, Ticket)
        
    def test_ticket_assigned_to_user(self):
        self.ticket.TicketAssignedTo = self.user.user
        self.ticket.save()
        self.assertEqual(self.ticket.TicketAssignedTo, self.user.user)
        
    def test_ticket_submitted_by_user(self):
        self.ticket.TicketSubmittedBy = self.user.user
        self.ticket.save()
        self.assertEqual(self.ticket.TicketSubmittedBy, self.user.user)
        
    def test_ticket_points_validation(self):
        with self.assertRaises(ValueError):
            self.ticket.TicketPoints = 11

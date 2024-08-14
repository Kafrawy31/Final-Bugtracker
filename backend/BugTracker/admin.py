from django.contrib import admin


from .models import Ticket,DevUser,Project
admin.site.register(Ticket)
admin.site.register(Project)
admin.site.register(DevUser)

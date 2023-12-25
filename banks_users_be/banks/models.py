from django.db import models
from users.models import User

class Bank(models.Model):
    bank_name = models.CharField(('bank_name'), max_length=100, blank=False, null=False, unique=True)
    routing_number = models.CharField(('routing_number'), max_length=100, blank=False, null=False, unique=True)
    swift_bic = models.CharField(('swift_bic'), max_length=100, blank=False, null=False, unique=True)
    users = models.ManyToManyField(User,  related_name='banks')

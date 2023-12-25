from django.db import models


class User(models.Model):
    first_name = models.CharField(
        ("first_name"), max_length=100, blank=False, null=False, unique=False
    )
    last_name = models.CharField(
        ("last_name"), max_length=100, blank=False, null=False, unique=False
    )
    username = models.CharField(
        ("username"), max_length=100, blank=False, null=False, unique=True
    )
    email = models.EmailField(("email"), blank=False, unique=True)
    password = models.CharField(
        ("password"), max_length=100, blank=False, null=False, unique=False
    )

# Generated by Django 5.0 on 2023-12-22 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('banks', '0001_initial'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bank',
            name='users',
            field=models.ManyToManyField(to='users.user'),
        ),
    ]
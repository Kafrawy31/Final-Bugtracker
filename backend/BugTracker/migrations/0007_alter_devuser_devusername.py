# Generated by Django 4.1.7 on 2023-04-13 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BugTracker', '0006_alter_devuser_last_reset'),
    ]

    operations = [
        migrations.AlterField(
            model_name='devuser',
            name='devUserName',
            field=models.CharField(blank=True, default='', max_length=20, null=True),
        ),
    ]
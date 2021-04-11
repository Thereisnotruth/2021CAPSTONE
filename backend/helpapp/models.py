from django.db import models

# Create your models here.


class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    user_pw = models.CharField(max_length=20)
    user_name = models.CharField(max_length=20)
    gender = models.CharField(max_length=5)
    character_type = models.IntegerField()
    level = models.IntegerField()
    exp = models.FloatField()
    point = models.IntegerField()

class Study(models.Model):
    study_id = models.IntegerField(primary_key=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    study_exp = models.FloatField()
    capacity = models.IntegerField()

class User_Study(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    study_id = models.ForeignKey(Study, on_delete=models.CASCADE)
    date = models.DateTimeField()

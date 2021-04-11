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

class Item(models.Model):
    item_id = models.IntegerField(primary_key=models.CASCADE)
    item_name = models.CharField(max_length=20)
    item_price = models.IntegerField()
    item_type = models.IntegerField()

class Inventory(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    buy_time = models.DateTimeField(auto_now_add=True)

class Board(models.Model):
    board_id = models.IntegerField(primary_key=models.CASCADE)
    board_name = models.CharField(max_length=20)

class Post(models.Model):
    post_id = models.IntegerField(primary_key=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    content = models.CharField(max_length=500) # 글자 제한 500
    time = models.DateTimeField(auto_now_add=True) # 해당 레코드 생성 시 생성 시간 자동 저장
    
class Comment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    time = models.DateTimeField(auto_now_add=True)
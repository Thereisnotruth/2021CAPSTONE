from django.db import models

class User(models.Model):
    user_number = models.BigAutoField(primary_key=True)
    user_id = models.CharField(unique=True, max_length=20)
    user_pw = models.CharField(max_length=20)
    user_name = models.CharField(max_length=20)
    gender = models.CharField(max_length=5)
    character_type = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    point = models.IntegerField(default=0)
    back_exp = models.FloatField(default=0)
    chest_exp = models.FloatField(default=0)
    shoulder_exp = models.FloatField(default=0)
    belly_exp = models.FloatField(default=0)
    arm_exp = models.FloatField(default=0)
    leg_exp = models.FloatField(default=0)
    exercise_time = models.IntegerField(default=0)
    exercise_state = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_name

class Study(models.Model):
    study_id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    current_user_count = models.IntegerField(default=1)
    study_name = models.CharField(max_length=20, unique=True)
    study_total_time = models.FloatField(default=0)
    capacity = models.IntegerField(default=10)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.study_name

class User_Study(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    study_id = models.ForeignKey(Study, on_delete=models.CASCADE, db_column='study_id')
    date = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'study_id'], name='user_in_study')
        ]

    def __str__(self):
        return str(self.study_id) + ' 스터디 회원 ' + str(self.user_id)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Invitation(models.Model):
    invitation_id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='to')
    study_id = models.ForeignKey(Study, on_delete=models.CASCADE, db_column='from')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.invitation_id


class Item(models.Model):
    item_id = models.BigAutoField(primary_key=True)
    item_name = models.CharField(max_length=20)
    item_price = models.IntegerField()
    item_type = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.item_name

class Inventory(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, db_column='item_id')
    buy_time = models.DateTimeField(auto_now_add=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user_id', 'item_id'], name='item_in_inventory')
        ]

class Board(models.Model):
    board_id = models.BigAutoField(primary_key=True)
    board_name = models.CharField(max_length=20)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.board_name

class Post(models.Model):
    post_id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE, db_column='board_id')
    post_title = models.CharField(max_length=20)
    post_content = models.CharField(max_length=500) # 글자 제한 500

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    comment_id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, db_column='post_id')
    content = models.CharField(max_length=200)
    time = models.DateTimeField(auto_now_add=True)


    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content
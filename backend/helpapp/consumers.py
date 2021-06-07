import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db  import database_sync_to_async
from helpapp.models import User
class ExConsumer(AsyncWebsocketConsumer):
  async def connect(self):
    self.user_id = self.scope['url_route']['kwargs']['user_id']
    self.user_group_name  = 'ex_%s' % self.user_id

    await self.channel_layer.group_add(
      self.user_group_name,
      self.channel_name
    )
    await self.accept()

  async def disconnect(self, close_code):
   await self.channel_layer.group_discard(
      self.user_group_name,
      self.channel_name
    )
  # 클라이언트에서 오는 소켓 통신 
  async def receive(self, text_data):
    print(text_data)
    text_data_json = json.loads(text_data)
    time = text_data_json['time']
    expart = text_data_json['expart']
    button = text_data_json['btn']
    print(button)
    # 운동 시작 메시지
    if button == 1:
      await self.start_exercise(self.user_id, time)

      await self.channel_layer.group_send(
        self.user_group_name,
        {
          'type': 'spread_message',
          'user_id': self.user_id,
          'time': time, # 시작 시간
          'exercise_state': True
        }
      )
    # 운동 중지 메시지
    elif button == 2:
      await self.stop_exercise(self.user_id)

      await self.channel_layer.group_send(
        self.user_group_name,
        {
          'type': 'spread_message',
          'user_id': self.user_id,
          'time': 0,
          'exercise_state': False
        }
      )
  @database_sync_to_async
  def start_exercise(self, user_id, time):
    user = User.objects.get(user_id=user_id)
    user.exercise_state = True
    user.exercise_start_time = time
    user.save()
  
  @database_sync_to_async
  def stop_exercise(self, user_id):
    user = User.objects.get(user_id=user_id)
    user.exercise_state = False
    user.exercise_start_time = 0
    user.save()
  
  # 서버에서 클라이언트로 뿌려주는 소켓 통신
  async def spread_message(self, event):
    user_id = event['user_id']
    time = event['time']
    exercise_state = event['exercise_state']

    await self.send(text_data=json.dumps({
      'user_id': user_id,
      'time': time,
      'exercise_state': exercise_state
    }))
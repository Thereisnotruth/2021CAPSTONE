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
  
  async def receive(self, text_data):
    print(text_data)
    text_data_json = json.loads(text_data)
    start_time = text_data_json['start_time']
    expart = text_data_json['expart']
    button = text_data_json['btn']
    print(button)
    if button == 1:
      await self.start_exercise(self.user_id, start_time)

      await self.channel_layer.group_send(
        self.user_group_name,
        {
          'type': 'spread_message',
          'user_id': self.user_id,
          'start_time': start_time,
          'exercise_state': True
        }
      )
  @database_sync_to_async
  def start_exercise(self, user_id, start_time):
    user = User.objects.get(user_id=user_id)
    user.exercise_state = True
    user.save()
  
  @database_sync_to_async
  def puase_exercise(self, user_id, time):
    pass
  
  @database_sync_to_async
  def stop_exercise(self, user_id):
    pass

  async def spread_message(self, event):
    user_id = event['user_id']
    start_time = event['start_time']
    exercise_state = event['exercise_state']

    await self.send(text_data=json.dumps({
      'user_id': user_id,
      'start_time': start_time,
      'exercise_state': exercise_state
    }))
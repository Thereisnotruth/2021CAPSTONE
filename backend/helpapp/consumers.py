import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db  import database_sync_to_async

class ExConsumer(AsyncWebsocketConsumer):
  def connect(self):
    self.accept()

  def disconnect(self, close_code):
    pass

  def receive(self, text_data):
    text_data_json = json.loads(text_data)
    message = text_data_json['message']

    self.send(text_data=json.dumps({
      'message': message
    }))

  def chat_message(self, event):
    message = event['message']

    self.send(test_data=json.dumps({
      'message': message
    }))
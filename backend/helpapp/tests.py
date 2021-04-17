from django.test import TestCase, Client

# Create your tests here.
class TestTestCase(TestCase):
    def setUp(self):
        print("setUp: setUp 함수는 테스트를 실행 할 때마다 호출됨.")
        pass
    def test_test(self):
        client = Client()
        response = client.get('/helpapp/test')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'message': 'GET 테스트'})

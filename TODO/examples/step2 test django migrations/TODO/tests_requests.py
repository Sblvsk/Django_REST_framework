import requests
from requests.auth import HTTPBasicAuth


# response = requests.post('http://127.0.0.1:8013/api-token-auth/', data={'username':
# 'developer', 'password': 'wqerty1234'})
# print(response.status_code)
# print(response.json())

data = {'username': 'developer', 'password': 'wqerty1234'}
response = requests.post('http://127.0.0.1:8013/api-token-auth/', data=data)
token = response.json().get('token')

response_users = requests.get('http://127.0.0.1:8013/api/users/', headers={"Authorization":f'Token {token}'})
print(response_users.json())

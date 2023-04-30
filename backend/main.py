import os
from flask import Flask, request, redirect, Response
from flask_cors import CORS
import json
import pymongo
import unittest
import bson.json_util as json_util

app = Flask(__name__)
CORS(app)
#follow this format for accessing db mongodb+srv://username:<PASSWORD>@guppybuddies.tfnbypd.mongodb.net/<DATABASE> 
#retryWrites=true&w=majority
my_secret = open("/home/ec2-user/private/key.txt", "r")  # private key inside AWS
myclient = pymongo.MongoClient(my_secret.readline())
my_secret.close()


user_db = myclient["Users"]
#accessing collection "user_data", so we're accessing "Users.user_data"
user_collection = user_db["user_data"]
todo_collection = user_db["user_todos"]

#searching within user db for existing user by username or User ID, if not we can create
@app.route("/user-collection/<user_val>")
def search_by_id_or_name(user_val):
  user_list = []
  username = ""
  for user in user_collection.find():
    if user['username'] == user_val or user['User ID'] == user_val:
      return json_util.dumps(user)
    # elif user['User ID'] == user_val:
    #   user_id = user_val
  raise ValueError('Guppy not found')


#creating a new user with requisite identifiers and data
@app.route('/user-collection/create', methods=['POST'])
def create():
  user_id = request.form.get('User ID')
  username = request.form.get('username')
  guppy_no = request.form.get('Guppy No.')
  obj = {'User ID': user_id, 'username': username, 'Guppy No.': guppy_no}
  user_collection.insert_one(obj)
  return redirect(request.referrer)


# client = app.test_client()
# def check(url):
#   r = client.get(url)
#   return r.status, r.headers.get('location')

@app.route('/todo-collection/<user_val>')
def get_todo_for_user(user_val):
  for todo in todo_collection.find():
    if(todo['user_id'] == user_val):
      return json_util.dumps(todo)
  raise ValueError('Todo not found for current guppy')

@app.route('/todo-collection/save', methods=['POST'])
def save_todo():
  user_id = request.json['user_id']
  item_list = request.json['list']
  update_filter = {'user_id': user_id}
  new_list = {"$set": {'list': item_list}}
  todo_collection.update_one(update_filter, new_list, upsert=True)
  return Response("{'status':'201'}", status=201, mimetype='application/json')

if __name__ == "__main__":
  app.run(host="0.0.0.0")
  # check("/user-collection/<user_id>")
  # check("/user-collection/<username>")
  # check("/user-collection/create")
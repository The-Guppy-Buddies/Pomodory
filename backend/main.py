import os
from flask import Flask, request, redirect
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




# @app.route("/marlin")
# def marlin():
#   return "This is marlin!"


# @app.route("/nemo")
# def nemo():
#   return "I'm Nemo from Finding Nemo!"


# print(search_by_id('001'))
# search_by_id('001')

if __name__ == "__main__":
  app.run(host="0.0.0.0")
  # check("/user-collection/<user_id>")
  # check("/user-collection/<username>")
  # check("/user-collection/create")
import os
from flask import Flask, request, redirect
from flask_cors import CORS
import json
import pymongo
import unittest
import bson.json_util as json_util

app = Flask(__name__)
CORS(app)
my_secret = "hi I am Pomodory"  # private key inside Secrets of Replit
myclient = pymongo.MongoClient(my_secret)

#accessing db "Members"
mydb = myclient["Members"]
#accessing collection "members", so we're accessing "Members.members"
mycollection = mydb["members"]


#we search the db by id num (key), and then return the associated values
@app.route("/collection/<id>")
def search_by_id(id):
  res = []
  # try:
  for item in mycollection.find():
    if item["Member ID"] == id:
      #print(item)
      return json_util.dumps(item)
  raise ValueError('Guppy not found')
  # except ValueError as Error: 
  #   return "Guppy not found"

  # for value in mycollection.find():
  #  return json_util.dumps(value)


@app.route('/collection/create', methods=['POST'])
def create():
  member_id = request.form.get('Member ID')
  name = request.form.get('name')
  occupation = request.form.get('occupation')
  obj = {'Member ID': member_id, 'name': name, 'occupation': occupation}
  mycollection.insert_one(obj)
  return redirect(request.referrer)


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

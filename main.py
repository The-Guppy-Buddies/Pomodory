from flask import Flask
from flask_cors import CORS
import json
import pymongo
import bson.json_util as json_util

app = Flask(__name__)
CORS(app)


myclient = pymongo.MongoClient("mongodb+srv://adultishgambino:E7J1KjRM6nkPOLRd@guppybuddies.tfnbypd.mongodb.net/MembersretryWrites=true&w=majority")

#accessing db "Members"
mydb = myclient["Members"]
#accessing collection "members", so we're accessing "Members.members"
mycollection = mydb["members"]
#we search the db by id num (key), and then return the associated values
@app.route("/collection")
def search_by_id():
  res = []
  for item in mycollection.find():
    print(item) 
  for value in mycollection.find():
    return json_util.dumps(value)
  




#init_db()
#print(search_by_id('001'))
search_by_id()


app.run(host = "0.0.0.0")
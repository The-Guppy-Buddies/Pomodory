from flask import Flask
from flask_cors import CORS
import json
import pymongo
import bson.json_util as json_util

# import required module
from playsound import playsound
app = Flask(__name__)
CORS(app)


@app.route("/playaudio")
def audio():
    playsound(r"Mess Call - USAF Heritage of America Band .mp3")
    return("Playing audio now")


audio()
app.run(host = "0.0.0.0")


# for playing note.wav file


from flask import Flask
import sys
import os
import json
from flask import jsonify
from flask import request
from flask_cors import CORS
import csv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
<<<<<<< HEAD
=======

>>>>>>> dc67960944a7f37517053ee5d11cc7dd2de0722e

@app.route('/')
def hello():
    return("This is the backEnd: Use /listFiles for a json of the files and folders")


@app.route('/listFiles')
def list_files():
    root = "Analytiq"
    thisdict = {}
    for path, subdirs, files in os.walk(root):
        #x = str(path).replace('C:\\Users\\Abdul\\Documents', "")
        # x=(x[1:])
        thisdict[str(path)] = [subdirs, files]
    return jsonify(thisdict)


@app.route('/openFile', methods=['POST'])
def openFile():
    stuff = request.get_json()
    fname = stuff["name"]
    for root, dirs, files in os.walk("Analytiq"):
        if fname in files:
            way = os.path.join(root, fname)
    head = []
    data = []
    with open(way) as csvfile:
        readCSV = csv.reader(csvfile, delimiter=',')
        n = 0
        for row in readCSV:
            if n == 0:
                head = row
                n += 1
            else:
                data.append(row)
    return jsonify(head, data)


if __name__ == '__main__':
    app.run(debug=True)

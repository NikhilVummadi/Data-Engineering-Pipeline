from flask import Flask
import sys,os
import json
from flask import jsonify
from flask import request
import csv

app = Flask(__name__)

@app.route('/')
def hello():
    return("Hello World")

@app.route('/listFiles')
def list_files():
    root = "C:\\Users\\Abdul\\Documents\\Analytiq"
    thisdict = {}
    for path, subdirs, files in os.walk(root):
        x = str(path).replace('C:\\Users\\Abdul\\Documents', "")
        x=(x[1:])
        thisdict[x] = [subdirs,files]
    return jsonify(thisdict)

@app.route('/openFile', methods=['POST'])
def openFile():
    stuff = request.get_json()
    fname = stuff["name"]
    for root, dirs, files in os.walk("C:\\Users\\Abdul\\Data-Engineering-Pipeline\\backEnd\\Analytiq"):
        if fname in files:
            way = os.path.join(root, fname)
    holder = {}
    with open(way) as csvfile:
    readCSV = csv.reader(csvfile, delimiter=',')
    n = 0
    for row in readCSV:
        holder[str(n)]=row
        n = n+1
    return jsonify(holder)


if __name__ == '__main__':
    app.run(debug=True)

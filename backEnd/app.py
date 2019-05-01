from flask import Flask
import sys
import os
import json
from flask import jsonify
import csv
from flask import Flask, render_template, request
from flask_pymongo import PyMongo
from flask_cors import CORS
import io

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return("This is the backEnd: Use /listPrivateFiles, /listPublicFiles,/loginCheck send userName and userPass, /upload to upload files, /sendFile to send file to front end use filename, /changeMast to change flie type use fileName and status, /addFolder to add folder folderName and parentName")

#mongo = PyMongo(app)
mongo1 = PyMongo(app, uri="mongodb+srv://UserOne:PasswordOne@cluster0-t3xr6.mongodb.net/DataPipeline?retryWrites=true")

@app.route('/loginCheck', methods = ['POST'])
def loginCheck():
    hold = request.get_json()
    userName = hold['userName']
    userPass = hold['userPass']
    x = mongo1.db.User
    for doc in x.find():
        if userName == doc['username'] and userPass == doc['password'] :
            return "Login Successful"
        elif userName == doc['username'] and userPass != doc['password']:
            return "Password Wrong"
        else:
            return "User does not exsist"

@app.route('/upload', methods = ['POST'])
def upload():
    hold = request.files['fileName']
    mongo1.save_file(hold.filename,hold)
    files = mongo1.db.files
    x = mongo1.db.fs.files
    users = mongo1.db.User
    for doc in x.find():
        if hold.filename == doc['filename']:
            #This stuff adds elements to the file that are needed
            mongo1.db.fs.files.update({
            '_id': doc['_id']
            },{
            '$set':{
            'displayName':hold.filename
            }
            },upsert=False)
            mongo1.db.fs.files.update({
            '_id': doc['_id']
            },{
            '$set':{
            'master': False
            }
            },upsert=False)
            mongo1.db.fs.files.update({
            '_id': doc['_id']
            },{
            '$set':{
            'parent': 'private'
            }
            },upsert=False)
            mongo1.db.fs.files.update({
            '_id': doc['_id']
            },{
            '$set':{
            'type': 'file'
            }
            },upsert=False)
            #hard code
            for q in users.find():
                if q['username'] == 'abdulhabib':
                    foo = q['_id']
                    mongo1.db.User.update({
                    '_id': foo
                    },{
                    '$push':{
                    'files': doc['_id']
                    }
                    },upsert=False)
    #files.insert({'Name': hold.filename,'displayName': hold.filename, 'master': False,'path':'private'})
    return "Added File to DataBase"

@app.route('/sendFile', methods = ['POST'])
def sendFile():
    hold = request.get_json()
    fname = hold['fileName']
    return mongo1.send_file(fname)

@app.route('/changeMast', methods = ['POST'])
def changeMast():
    hold = request.get_json()
    fname = hold['fileName']
    status = hold['status']
    x = mongo1.db.fs.files
    if status:
        for doc in x.find():
            if fname == doc['filename']:
                mongo1.db.fs.files.update({
                '_id': doc['_id']
                },{
                '$set':{
                'master': True
                }
                },upsert=False)
    else:
        for doc in x.find():
            if fname == doc['filename']:
                mongo1.db.fs.files.update({
                '_id': doc['_id']
                },{
                '$set':{
                'master': False
                }
                },upsert=False)
    return "Change has been done!"

@app.route('/addFolder', methods = ['POST'])
def addFolder():
    hold = request.get_json()
    folder = hold['folderName']
    parent = hold['parentName']
    users = mongo1.db.User
    files = mongo1.db.fs.files
    poop = []
    files.insert({'filename': folder,'type': 'folder', 'parent': parent})
    for things in files.find():
        if things['filename'] == folder:
            poop = things['_id']
    for q in users.find():
        if q['username'] == 'abdulhabib':
            foo = q['_id']
            mongo1.db.User.update({
            '_id': foo
            },{
            '$push':{
            'folders': poop
            }
            },upsert=False)
    return "Added Folder"

@app.route('/listPrivateFiles')
def listPrivateFiles():
    users = mongo1.db.User
    files = mongo1.db.fs.files
    a = {}
    tempVar = {"name":"private","children":[]}
    for q in users.find():
        if q['username'] == 'abdulhabib':
            for things in q['folders']:
                for stuff in files.find():
                    if stuff['_id']== things:
                        a[stuff['filename']]=[]
                        if stuff['parent'] in a:
                            a[stuff['parent']].append(stuff['filename'])
                        else:
                            a[stuff['parent']]=[stuff['filename']]
    for q in users.find():
        if q['username'] == 'abdulhabib':
            for things in q['files']:
                for stuff in files.find():
                    if stuff['_id']== things:
                        if stuff['parent'] in a:
                            a[stuff['parent']].append(stuff['filename'])
                        else:
                            a[stuff['parent']]=[stuff['filename']]
    return jsonify(a)

@app.route('/listPublicFiles')
def listPublicFiles():
    users = mongo1.db.User
    files = mongo1.db.fs.files
    a = {}
    for q in users.find():
        if q['username'] == 'Public':
            for things in q['folders']:
                for stuff in files.find():
                    if stuff['_id']== things:
                        if stuff['parent'] in a:
                            a[stuff['parent']].append(stuff['filename'])
                        else:
                            a[stuff['parent']]=[stuff['filename']]
    for q in users.find():
        if q['username'] == 'Public':
            for things in q['files']:
                for stuff in files.find():
                    if stuff['_id']== things:
                        if stuff['parent'] in a:
                            a[stuff['parent']].append(stuff['filename'])
                        else:
                            a[stuff['parent']]=[stuff['filename']]
    return jsonify(a)

@app.route('/moveFiles', methods = ['POST'])
def moveFiles():
    hold = request.get_json()
    tempFile = hold['folderName']
    parent = hold['parentName']
    users = mongo1.db.User
    files = mongo1.db.fs.files
    for thing in files.find():
        if thing['filename']==tempFile:
            mongo1.db.fs.files.update({
            '_id': thing['_id']
            },{
            '$set':{
            'parent': parent
            }
            },upsert=False)
    return "Moved!"

if __name__ == '__main__':
    app.run(debug=True)

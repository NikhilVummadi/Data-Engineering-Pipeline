import sys,os
import json
import shutil

root = "C:\Users\Abdul\Documents\Analytiq"
#path = os.path.join(root, "CS431")

thisdict = {}

for path, subdirs, files in os.walk(root):
    x = str(path).replace('C:\Users\Abdul\Documents', "")
    x=(x[1:])
    #x=x.replace("\\","-")
    #print(x)
    thisdict[x] = [subdirs,files]

print(thisdict)


#shutil.move("path/to/current/file.foo", "path/to/new/destination/for/file.foo")


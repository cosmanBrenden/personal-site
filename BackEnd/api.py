# https://stackoverflow.com/questions/44209978/serving-a-front-end-created-with-create-react-app-with-flask

from datetime import datetime
from flask import Flask, send_from_directory, send_file, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
import sys
import time
import traceback
from werkzeug.serving import run_simple

from database_driver import DatabaseDriver
from file_grabber import FileGrabber

PORT = 5000

"""
Serves the client the file at fp, named with filename
"""
def download(fp, filename):
    print(f"Downloading '{fp}'")
    try:
        return send_file(
            fp,
            # as_attachment=True,
            download_name=filename
        )
    except Exception as e:
        traceback.print_tb(e.__traceback__)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

def get_blog_results(tags):
    print(f"Searching with tags '{tags}'")
    tags = tags.replace("'", "")
    tags = tags.split(",")
    incl_str = ""
    excl_str = ""
    for tag in tags:
        if(tag != ""):
            if(tag[0] == "-"):
                excl_str += f"'{tag[1:]}',"
            else:
                incl_str += f"'{tag}',"

    incl_str = incl_str[:len(incl_str)-1]
    excl_str = excl_str[:len(excl_str)-1]
    try:
        if(incl_str == "" and excl_str == ""):
            message = db.execute(f"select * from blogs;")
        elif(incl_str != "" and excl_str == ""):
            message = db.execute(f"select * from blogs where ARRAY[{incl_str}] <@ tags;")
        elif(incl_str == "" and excl_str != ""):
            message = db.execute(f"select * from blogs where not( ARRAY[{excl_str}] && tags);")
        else:
            message = db.execute(f"select * from blogs where ARRAY[{incl_str}] <@ tags and not( ARRAY[{excl_str}] && tags);")
        # { id: 0, title: 'Lorem ipsum 0', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', tags: 'banana rant, weekly' , date: 1691622800}
        message = [{
            "id": row[0],
            "title": row[1],
            "description": row[2],
            "tags": row[3],
            "date": row[4].timestamp(),
            "path": row[5]
        } for row in message]
        return jsonify(message), 200
    except Exception as e:
        print(e)
        traceback.print_tb(e.__traceback__)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

# Init the file grabber
fg = FileGrabber()

try:
    db = DatabaseDriver()
except Exception as e:
    print(e)
    traceback.print_tb(e.__traceback__)
    sys.exit()

# Starts the flask app
app = Flask(__name__, static_folder='../FrontEnd/build')
# Init a rate limiter, 20 api calls per second by default
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["20 per second"],
    storage_uri="memory://",
    # Redis
    # storage_uri="redis://localhost:6379",
    # Redis cluster
    # storage_uri="redis+cluster://localhost:7000,localhost:7001,localhost:70002",
    # Memcached
    # storage_uri="memcached://localhost:11211",
    # Memcached Cluster
    # storage_uri="memcached://localhost:11211,localhost:11212,localhost:11213",
    # MongoDB
    # storage_uri="mongodb://localhost:27017",
    strategy="fixed-window", # or "moving-window", or "sliding-window-counter"
)


"""
Serve React App
"""
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    print("Serving app...")
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/favicon.ico')
def favicon():
    print("Getting favicon...")
    return send_from_directory(app.static_folder,
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

"""
Serve explicit file downloads
"""
@app.route("/api/content/<filename>", methods=["GET"])
def download_by_name(filename):
    try:
        fp = fg.get_filepath(filename)
        return download(fp, filename)
    except Exception as e:
        traceback.print_tb(e.__traceback__)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

"""
Serves a background chosen by the API
"""
@app.route("/api/background", methods=["GET"])
def download_bg():
    try:
        fp, fname = fg.get_background()
        return download(fp,fname)
    except Exception as e:
        traceback.print_tb(e.__traceback__)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route("/api/blog/<id>", methods=["GET"])
def getblog(id):
    print(f"Getting blog: {id}")
    try:
        message = db.execute(f"select * from blogs where id in ('{id}');")
        message = [{
            "id": row[0],
            "title": row[1],
            "description": row[2],
            "tags": row[3],
            "date": row[4].timestamp(),
            "path": row[5]
        } for row in message]
        message = message[0]
        return jsonify(message), 200
    except Exception as e:
        traceback.print_tb(e.__traceback__)
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route("/api/tags/<tags>")
def search_by_tag(tags):
    return get_blog_results(tags)

@app.route("/api/tags/")
def search_empty():
    return get_blog_results("")

# Runs the app if this script is being run as main
if __name__ == '__main__':
    run_simple("0.0.0.0", PORT, app, threaded=True, ssl_context=('cert.pem', 'key.pem'))
    try:
        db.close()

    except Exception as e:
        print(e)

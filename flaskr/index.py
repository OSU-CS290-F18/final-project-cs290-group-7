from flask import Blueprint, send_from_directory
import os

bp = Blueprint('index', __name__, static_folder=os.path.join("..", "static"))

@bp.route('/', methods=('GET',))
@bp.route('/index.html', methods=('GET',))
def index():
    print(bp.static_folder)
    return bp.send_static_file('index.html')

@bp.route('/dist/<path:filename>', methods=('GET',))
def script(filename):
    return send_from_directory(os.path.join(bp.static_folder, "dist"), filename)

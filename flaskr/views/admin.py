from flask import Blueprint
import os

admin = Blueprint('admin', __name__, static_folder=os.path.join("..", "..", "static"))

from . import index, auth

from flask import Blueprint, send_from_directory
import os
from .admin import admin

@admin.route('/dist/<path:filename>', methods=('GET',))
def script(filename):
    return send_from_directory(os.path.join(admin.static_folder, "dist"), filename)

@admin.route('/<path:filename>', methods=('GET',))
def index(filename):
    return admin.send_static_file('index.html')

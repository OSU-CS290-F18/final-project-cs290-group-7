from flaskr.db import get_db
from flask import jsonify, request, send_from_directory, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from hashlib import sha256
from .post_helpers import *
from .admin import admin

@admin.route('/upload', methods=('POST',))
@jwt_required
def upload():
    db = get_db()
    identity = get_jwt_identity()
    error = None
    if form_exists(request.form, 'title'):
        title = request.form['title']
    else:
        error = "Missing title"
    if form_exists(request.form, 'genre') and error is None:
        genre = request.form['genre']
    else:
        error = "Missing genre"
    if form_exists(request.files, 'music') and error is None:
        music = request.files['music']
        music_stream = music.read()
        filename = sha256(music_stream).hexdigest()
        error = check_music_integrity(music, music_stream, filename)
    else:
        error = "Missing mp3 file upload"

    if error is None:
        write_file(music_stream, filename)
        db.execute('INSERT INTO post (title, genre, author_uname, created, music) VALUES (?, ?, ?, julianday("now"), ?)', (title, genre, identity, filename))
        db.commit()
        return jsonify(upload="true"), 200
    return jsonify(upload="false", error=error), 401

@admin.route('/posts', methods=('POST',))
def front():
    db = get_db()
    query, params = get_posts_query(request.form)
    posts = db.execute(query, params).fetchall()
    return jsonify(posts=[dict(post) for post in posts]), 200

@admin.route('/posts/<path:post>', methods=('GET',))
def post(post):
    db = get_db()
    exists = db.execute("SELECT music FROM post WHERE music = ?", (post,)).fetchone()
    if exists is not None:
        return send_music(post)
    return jsonify(filename=post, result="not found"), 404

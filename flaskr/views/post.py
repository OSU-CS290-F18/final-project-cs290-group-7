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
    title = request.form['title']
    genre = request.form['genre']
    music = request.files['music']
    music_stream = music.read()
    filename = sha256(music_stream).hexdigest()
    error = None

    if not title:
        error = "Missing title"
    elif not genre:
        error = "Missing genre"
    elif not music_stream or music.filename == "":
        error = "Missing mp3 file upload"
    elif not verify_music(music, music_stream):
        error = "Invalid mp3 file"
    elif db.execute('SELECT music FROM post WHERE music = ?', (filename,)).fetchone() is not None:
        error = "Could not upload duplicate files"
    
    if error is None:
        write_file(music_stream, filename)
        db.execute('INSERT INTO post (title, genre, author_uname, created, music) VALUES (?, ?, ?, julianday("now"), ?)', (title, genre, identity, filename))
        db.commit()
        return jsonify(upload="true"), 200
    return jsonify(upload="false", error=error), 401

@admin.route('/posts', methods=('POST',))
def front():
    db = get_db()
    title = request.form['title']
    genre = request.form['genre']
    limit = request.form['limit']
    query = 'SELECT * FROM post'
    params = []

    if title:
        params.append(title)
        query += ' WHERE title = ?'
    if genre:
        params.append(genre)
        if title:
            query += ' AND genre = ?'
        else:
            query += ' WHERE genre = ?'
    if limit:
        try:
            int(limit)
        except ValueError:
            limit = "20"
    else:
        limit = "20"
    params.append(limit)
    query += ' LIMIT ?'

    params = tuple(params)
    posts = db.execute(query, params).fetchall()
    return jsonify(posts=[dict(post) for post in posts]), 200

@admin.route('/posts/<path:post>', methods=('GET',))
def post(post):
    db = get_db()
    exists = db.execute("SELECT music FROM post WHERE music = ?", (post,)).fetchone()
    if exists is not None:
        return send_music(post)
    return jsonify(filename=post, result="not found"), 404

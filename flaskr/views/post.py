from flaskr.db import get_db
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from .admin import admin

@admin.route('/upload', methods=('POST',))
@jwt_required
def upload():
    db = get_db()
    identity = get_jwt_identity()
    title = request.form['title']
    genre = request.form['genre']
    music = request.form['music']
    error = None

    if not title:
        error = "Missing title"
    elif not genre:
        error = "Missing genre"
    elif not music:
        error = "Missing music upload"
    
    if error is None:
        db.execute('INSERT INTO post (title, genre, author_uname, created, music) VALUES (?, ?, ?, julianday("now"), ?)', (title, genre, identity, music))
        db.commit()
        return jsonify(upload="true"), 200
    return jsonify(upload="false", error=error), 401

@admin.route('/front_page', methods=('POST',))
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

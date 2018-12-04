from flaskr.db import get_db
from flask import current_app, send_from_directory
import magic
import os

def verify_music(music, music_stream):
    f = magic.Magic(mime=True)
    mime = f.from_buffer(music_stream) == "audio/mpeg"
    try:
        ext = music.filename.rsplit(".", 1)[1].lower() == "mp3"
    except IndexError:
        return False
    return ext and mime

def write_file(stream, filename):
    with open(os.path.join(current_app.config['UPLOAD_FOLDER'], filename), 'wb') as f:
        f.write(stream)
    return True

def send_music(filename):
        return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename, as_attachment=True, mimetype="audio/mpeg")

def get_posts_query(forms):
    query = 'SELECT * FROM post'
    params = []

    if form_exists(forms, 'title'):
        params.append("%" + forms['title'].lower() + "%")
        query += ' WHERE title LIKE ?'
    if form_exists(forms, 'author'):
        params.append(forms['author'].lower())
        if form_exists(forms, 'title'):
            query += ' AND author_uname LIKE ? '
        else:
            query += ' WHERE author_uname LIKE ?'
    if form_exists(forms, 'genre'):
        params.append(forms['genre'].lower())
        if form_exists(forms, 'title') or form_exists(forms, 'author'):
            query += ' AND genre LIKE ?'
        else:
            query += ' WHERE genre LIKE?'
    if form_exists(forms, 'limit'):
        try:
            int(forms['limit'])
            limit = forms['limit']
        except ValueError:
            limit = "20"
    else:
        limit = "20"
    params.append(limit)
    query += ' ORDER BY id DESC LIMIT ?'
    return query, tuple(params)

def form_exists(forms, keyword):
    return keyword in forms and forms[keyword]

def check_music_integrity(music, music_stream, filename):
    db = get_db()
    error = None
    if not music_stream or music.filename == "":
        error = "Missing mp3 file upload"
    elif not verify_music(music, music_stream):
        error = "Invalid mp3 file"
    elif db.execute('SELECT music FROM post WHERE music = ?', (filename,)).fetchone() is not None:
        error = "Could not upload duplicate files"

    return error

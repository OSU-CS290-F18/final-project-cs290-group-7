from flask import current_app, send_from_directory, current_app
import magic
import os

def verify_music(music, music_stream):
    f = magic.Magic(mime=True)
    mime = f.from_buffer(music_stream) == "audio/mpeg"
    try:
        ext = music.filename.rsplit(".", 1)[1].lower() == "mp3"
    except IndexError:
        return false
    return ext and mime

def write_file(stream, filename):
    with open(os.path.join(current_app.config['UPLOAD_FOLDER'], filename), 'wb') as f:
        f.write(stream)
    return True

def send_music(filename):
        return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename, as_attachment=True, mimetype="audio/mpeg")

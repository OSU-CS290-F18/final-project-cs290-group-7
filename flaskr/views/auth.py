from flaskr.db import get_db
from flask import Blueprint, request, jsonify, flash
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from .admin import admin
from .auth_helpers import *

@admin.route('/register', methods=('POST',))
def register():
    username = request.form['username']
    password = request.form['password']
    db = get_db()
    error = None

    if not username:
        error = "Username not found"
    elif not password:
        error = "Password not found"
    elif db.execute('SELECT id FROM user WHERE uname = ?', (username,)).fetchone():
        error = f"Username {username} is already taken"
    elif len(password) < 8:
        error = "Password does not meet length requirement"

    if not error:
        hashed = generate_password_hash(password, method="pbkdf2:sha512")
        db.execute('INSERT INTO user (uname, pass, registered) VALUES (?, ?, julianday("now"))', (username, hashed))
        db.commit()
        return jsonify(register="true", error="None"), 200

    flash(error)
    return jsonify(register="false", error=error), 401

@admin.route('/login', methods=('POST',))
def login():
    username = request.form['username']
    password = request.form['password']
    db = get_db()
    error = None

    user_data = db.execute('SELECT uname, pass FROM user WHERE uname = ?', (username,)).fetchone()

    if not (user_data and check_password_hash(user_data['pass'], password)):
        error = "Username or password incorrect"
    if not error:
        access_token = create_access_token(identity=user_data['uname'])
        insert_token(access_token, db)
        return jsonify(login="true", access_token=access_token, access_expiration=get_expiration(access_token)), 200

    flash(error)
    return jsonify(login="false", error=error), 401

@admin.route('/logout', methods=('DELETE',))
@jwt_required
def logout():
    db = get_db()
    identity = get_jwt_identity()
    revoke_tokens(identity, db)
    return jsonify(tokens="revoked"), 200

@admin.route('/verify_token', methods=('POST',))
@jwt_required
def verify():
    return jsonify(msg="Token valid"), 200

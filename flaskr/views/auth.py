from flaskr.db import get_db
from flask import Blueprint, request, g, jsonify, flash, current_app
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_refresh_token_required, jwt_required, get_jwt_identity, JWTManager
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

    if not error:
        hashed = generate_password_hash(password)
        db.execute('INSERT INTO user (uname, pass, registered) VALUES (?, ?, julianday("now"))', (username, hashed))
        db.commit()
        return jsonify(register="success", error="None"), 200

    flash(error)
    return jsonify(register="failed", error=error), 401

@admin.route('/login', methods=('POST',))
def login():
    username = request.form['username']
    password = request.form['password']
    db = get_db()
    error = None

    user_data = db.execute('SELECT uname, pass FROM user WHERE uname = ?', (username,)).fetchone()

    if not user_data:
        error = "User not found"
    elif not check_password_hash(user_data['pass'], password):
        error = "Incorrect password"
    
    if not error:
        access_token = create_access_token(identity=user_data['uname'])
        refresh_token = create_refresh_token(identity=user_data['uname'])
        insert_token(access_token, db)
        insert_token(refresh_token, db)
        return jsonify(login="success", access_token=access_token, access_expiration=get_expiration(access_token), refresh_expiration=get_expiration(refresh_token), refresh_token=refresh_token), 200

    flash(error)
    return jsonify(login="failed", error=error), 401

@admin.route('/refresh', methods=('POST',))
@jwt_refresh_token_required
def refresh():
    db = get_db()
    username = get_jwt_identity()
    access_token = create_access_token(identity=username)
    insert_token(access_token, db)
    return jsonify(refresh="success", access_expiration=get_expiration(access_token), access_token=access_token), 200

@admin.route('/logout', methods=('DELETE',))
@jwt_required
def logout():
    db = get_db()
    identity = get_jwt_identity()
    revoke_tokens(identity, db)
    return jsonify(tokens="revoked"), 200

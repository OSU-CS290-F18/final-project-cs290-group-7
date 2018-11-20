import os

from flask import Flask
from flask_jwt_extended import JWTManager
from datetime import timedelta
from .views import admin
from . import db

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY = 'devkey',
        DATABASE = os.path.join(app.instance_path, 'flaskr.sqlite'),
        JWT_SECRET_KEY = 'super-secret',
        JWT_BLACKLIST_ENABLED = True,
        JWT_BLACKLIST_TOKEN_CHECKS = ['access'],
        JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    )
    if test_config:
        app.config.from_mapping(test_config)
    else:
        app.config.from_pyfile('config.py', silent=True)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    jwt = JWTManager(app)

    @jwt.token_in_blacklist_loader
    def check_if_token_in_blacklist(decoded_token):
        dbase = db.get_db()
        jti = decoded_token['jti']
        revoked =  dbase.execute('SELECT revoked FROM token WHERE jti = ?', (jti,)).fetchone()['revoked']
        if revoked is None:
            return True
        else:
            return revoked == 1

    db.init_app(app)

    app.register_blueprint(admin.admin)

    return app

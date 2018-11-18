import os

from flask import Flask
from . import db
from . import index

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY = 'devkey',
        DATABASE = os.path.join(app.instance_path, 'flaskr.sqlite')
    )
    if test_config:
        app.config.from_mapping(test_config)
    else:
        app.config.from_pyfile('config.py', silent=True)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(index.bp)

    db.init_app(app)
    return app

from flask import Flask

app = Flask(__name__)

from .elikart import elikart
app.register_blueprint(elikart)

from .server import *

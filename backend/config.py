import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'  # Important for Flask sessions/CSRF
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'pm_database.db')  # database path
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable modification tracking overhead
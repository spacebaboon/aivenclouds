# . venv/bin/activate
export PYTHONPATH=./src
export FLASK_APP=src/server.py
export FLASK_ENV=development
pipenv run flask run

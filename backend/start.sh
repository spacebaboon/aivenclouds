# . venv/bin/activate
export PYTHONPATH=./src
export FLASK_APP=src/server.py
if [ "$1" == "production" ] ; 
    then export FLASK_ENV=production ; 
    else export FLASK_ENV=development ; 
fi
echo "Starting Flask server in ${FLASK_ENV} mode"
pipenv run flask run

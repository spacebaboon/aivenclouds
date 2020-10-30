from flask import Flask
from flask_cors import CORS
from aiven_api import get_cloud_list
from formatters import build_response_data

import sys

app = Flask(__name__)
run_mode = app.config.get("ENV")
CORS(app)


@app.route("/status")
def status_page():
    return """
    <h1>Aiven Clouds back-end</h1>
    <p>Running in <strong>{mode}</strong> mode<p>
    """.format(
        mode=run_mode
    )


@app.route("/cloudlist")
def serve_cloud_list():
    # todo: read from request header
    user_geolocation = (60.1699, 24.9384)
    clouds_api_data = get_cloud_list(run_mode)
    return_json_data = build_response_data(clouds_api_data, user_geolocation)
    return return_json_data

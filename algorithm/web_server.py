# web_server.py

from flask import Flask, json, request, Response
from post_tour_handler import post_tour_handler

app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/post_tour", methods=["POST"])
def post_tour():
    print(request)
    print(request.headers)
    print(request.json)
    resp = Response(str(post_tour_handler(request.json)))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp
    # return str(post_tour_handler(request.json))


if __name__ == "__main__":
    app.run()

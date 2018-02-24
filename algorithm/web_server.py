# web_server.py

import http.server
import socketserver

PORT = 9090

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("web_server.py listening on port", PORT)
    httpd.serve_forever()

import http.server
import socketserver


import os
os.chdir("path/to/the/project")  # Change this to your project folder e.g. E:\Downloads\CTD

PORT = 8080  # Change this port if you want
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()

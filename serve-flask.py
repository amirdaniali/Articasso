from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__)

BASE_DIR = "path/to/the/project"

@app.route('/')
def serve_index():
    return send_from_directory(BASE_DIR, "index.html")

@app.route('/styles.css')
def serve_css():
    response = send_from_directory('.', 'styles.css')
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    return response

@app.route('/<path:filename>')
def serve_static_files(filename):
    file_path = os.path.join(BASE_DIR, filename)
    
    # If the requested file exists, serve it
    if os.path.exists(file_path):
        return send_from_directory(BASE_DIR, filename)
    
    # Otherwise, serve index.html to let JavaScript handle routing
    return send_file(os.path.join(BASE_DIR, "index.html"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, threaded=True)
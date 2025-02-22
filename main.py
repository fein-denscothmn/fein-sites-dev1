import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

# ルート `/` で `index.html` をレンダリング
@app.route('/')
def serve_static_index():
    return send_from_directory('www', 'index.html')

# 静的ファイルを提供
@app.route('/<path:filename>')
def serve_static_files(filename):
    return send_from_directory('www', filename)

# Flask の動的コンテンツ
@app.route('/top')
def serve_flask_content():
    return render_template('top.html')

if __name__ == '__main__':
    debug_mode = os.getenv('FLASK_DEBUG', 'False') == 'True'
    app.run(debug=debug_mode)

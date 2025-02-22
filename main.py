from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

# ルート `/` で `www/index.html` を提供
@app.route('/')
def serve_static_index():
    return send_from_directory('www', 'index.html')

# `www` ディレクトリ内の静的ファイルを提供
@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory('www', path)

# Flask の動的コンテンツ
@app.route('/top')
def serve_flask_content():
    return render_template('top.html')

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, abort
from flask_mail import Mail, Message
import geocoder
from user_agents import parse
import os

app = Flask(__name__)

app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME=os.environ['MAIL_USERNAME'],
    MAIL_PASSWORD=os.environ['MAIL_PASSWORD'],
    MAIL_DEFAULT_SENDER=os.environ['MAIL_USERNAME']
)
mail = Mail(app)

@app.before_request
def trap_scrapers():
    ua_string = request.headers.get('User-Agent', '')
    user_agent = parse(ua_string)
    ip = request.remote_addr
    g = geocoder.ip(ip)

    suspicious = any([
        'bot' in ua_string.lower(),
        'crawl' in ua_string.lower(),
        'spider' in ua_string.lower(),
        'scanner' in ua_string.lower(),
    ])

    if suspicious:
        try:
            msg = Message(
                subject=f"Suspicious Access Detected: {ip}",
                recipients=['badawytv76@gmail.com'],
                body=f"IP: {ip}\nUser-Agent: {ua_string}\nDevice: {user_agent}\nLocation: {g.city}, {g.country}"
            )
            mail.send(msg)
        except Exception as e:
            print("Mail error:", e)
        abort(404, description="Page not found")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return "Welcome to Badawy-TV. This site is fully secure.", 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

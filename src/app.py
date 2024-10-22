"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
# import os
# from flask import Flask, request, jsonify, url_for, send_from_directory
# from flask_migrate import Migrate
# from flask_swagger import swagger
# from api.utils import APIException, generate_sitemap
# from api.models import db
# from api.routes import api
# from api.admin import setup_admin
# from api.commands import setup_commands
# from flask_jwt_extended import JWTManager
import os
from flask import Flask, request, jsonify, url_for, send_from_directory, render_template
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from datetime import timedelta
import smtplib
from email.mime.text import MIMEText
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, create_refresh_token, get_jwt, set_access_cookies

# from models import Person

expires_in_minutes = 10
expires_delta = timedelta(minutes=expires_in_minutes)


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = "super-secret-mega-duper-secret"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
jwt = JWTManager(app)
# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/contact/mail', methods=["GET",'POST'])
def contact_mail():
    if request.method=="POST":
        data = request.get_json()
        nombre = data["name"]
        correo = data["email"]
        mensaje = data["message"]

        # jigi sepy goxl soim
        servidor = smtplib.SMTP("smtp.gmail.com", 587)
        servidor.starttls()
        servidor.login("redesconscientes2024@gmail.com", "jigi sepy goxl soim" )

        msg = MIMEText(f"Nombre:{nombre}\nMensaje:{mensaje}\nEmail:{correo}")

        msg["From"] = "redesconscientes2024@gmail.com"
        msg["To"] = "redesconscientes2024@gmail.com"
        msg["Subject"] = "Mensaje de Contacto"

        servidor.sendmail("redesconscientes2024@gmail.com", "redesconscientes2024@gmail.com", msg.as_string())

        servidor.quit()

        return "Mensaje enviado con exito!!"
    
    else:
        return render_template("home.js")
    
@app.route('/reset-password', methods=["GET",'POST'])
def reset_password():
    body = request.json
    access_token = create_access_token(identity=body, expires_delta=expires_delta)
    if request.method=="POST":
        data = request.get_json()
        correo = data["email"]

        # jigi sepy goxl soim
        servidor = smtplib.SMTP("smtp.gmail.com", 587)
        servidor.starttls()
        servidor.login("redesconscientes2024@gmail.com", "jigi sepy goxl soim" )

        


        msg = MIMEText(f"""
#         <h1> Si solicito recuperar la contraseña, ingrese al siguiente link</h1>
#         <a href="{os.getenv("FRONTEND_URL")}password-update?token={access_token}">
#             ir a recuperar contraseña
#         </a>
#     """)

        msg["From"] = "redesconscientes2024@gmail.com"
        msg["To"] = correo
        msg["Subject"] = "Mensaje de Contacto"

        servidor.sendmail("redesconscientes2024@gmail.com", correo, msg.as_string())

        servidor.quit()

        return "Mensaje enviado con exito!!"
    
    else:
        return render_template("home.js")



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

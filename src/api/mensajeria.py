from flask import Flask, request, render_template # type: ignore
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)

@app.route('/contact/mail', methods=["GET",'POST'])
def contact_mail():
    if request.method=="POST":
        nombre = request.form["name"]
        correo = request.form["email"]
        mensaje = request.form["message"]

        # jigi sepy goxl soim
        servidor = smtplib.SMTP("smtp.gmail.com", 587)
        servidor.starttls()
        servidor.login("redesconscientes2024@gmail.com", "jigi sepy goxl soim" )

        msg = MIMEText(f"Nombre:{nombre}\nMensaje:{mensaje}")

        msg["From"] = correo
        msg["To"] = "redesconscientes2024@gmail.com"
        msg["Subject"] = "Mensaje de Contacto"

        servidor.sendmail("redesconscientes2024@gmail.com", correo, msg.as_string)

        servidor.quit()

        return "Mensaje enviado con exito!!"
    
    else:
        return render_template("email.html")

if (__name__) == "__main__":
    app.run(debug=True)
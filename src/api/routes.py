"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from cmath import inf
from distutils.log import error
from http.client import OK
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import Session, UserProfileInfo, db, User, ClientTask, PaymentAccount, MiPsicologo, Phrase, Role
from api.utils import generate_sitemap, APIException
import json
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, create_refresh_token, get_jwt, set_access_cookies
from datetime import timedelta
from werkzeug.security import generate_password_hash, check_password_hash
import os
from functools import wraps
from datetime import date
from sqlalchemy import func

# Define roles
ROLES = {"psicologo": "Psicologo", "cliente": "Cliente"}

# Decorator to check for required role
def requires_role(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.has_role(role):
                return jsonify({"error": "No tienes permiso para acceder a este recurso"}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api)

@api.route('/sign-up', methods=['POST'])
def handle_register():
    updated_info = {}
    user_data = request.json

    # Validate required fields manually
    required_fields = ["email", "password", "is_psicologo"]
    missing_fields = [field for field in required_fields if field not in user_data]

    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    # Check if email already exists
    existing_user = User.query.filter_by(email=user_data["email"]).first()
    if existing_user:
        return jsonify({"error": "Email already exists"}), 400

    # Add salt to the password
    password = user_data['password']
    salt = os.urandom(10).hex()
    user_data['salt'] = salt
    user_data['password'] = generate_password_hash(salt + password)

    del user_data["fpv_number"]  # Assuming fpv_number is not required

    # Create the user
    newUser = User.create(user_data)

    if not newUser:
        # Handle unexpected user creation failure (log the error)
        print("Error creating user, check User.create implementation")
        return jsonify({"error": "Error creating user"}), 400

    access_token = create_access_token(identity=newUser.id)
    updated_info["user_id"] = newUser.id
    fpv = updated_info.get("fpv_number")  # Check for fpv_number existence

    # Assign role based on is_psicologo field (assuming newUser is not None)
    if newUser.is_psicologo:
        newUser.assigned_roles.append(Role(name=ROLES["psicologo"]))
    else:
        newUser.assigned_roles.append(Role(name=ROLES["cliente"]))

    # Create profile for the user
    create_profile_info = UserProfileInfo(
        user_id=newUser.id,
        fpv_number=fpv,
        # Add any additional profile fields here
    )

    try:
        db.session.add(create_profile_info)
        db.session.commit()
        return jsonify({"token": access_token, "results": create_profile_info.serialize()}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 500


@api.route('/sign-in', methods=['POST'])
def handle_login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify({"message": "Usuario no encontrado"}), 404
    
    salt = user.salt
    if check_password_hash(user.password, salt + password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"message": "Usuario logeado con éxito", "token": access_token}), 200
    return jsonify({"message": "Credenciales Inválidas"}), 401



@api.route('/activate/<int:user_id>', methods=['PUT'])
def activate_user(user_id):
    user = User.query.get(user_id)
    if user:
        user.is_active = True
        db.session.commit()
        return "Usuario activado con éxito", 200
    else:
        return "Usuario no encontrado", 404
    
@api.route('/delete/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)

    if user:
        # Elimina la cuenta de pago asociada al usuario
        sessions_to_delete = Session.query.filter_by(psychologist_id=user_id).all()
        for session in sessions_to_delete:
            db.session.delete(session)
        payment_account = PaymentAccount.query.filter_by(user_id=user_id).first()
        if payment_account:
            db.session.delete(payment_account)
        user_profile_info = UserProfileInfo.query.filter_by(user_id=user_id).first()
        if user_profile_info:
            db.session.delete(user_profile_info)
        mi_psicologo = MiPsicologo.query.filter_by(user_id=user_id).first()
        if mi_psicologo:
            db.session.delete(mi_psicologo)
        session = Session.query.filter_by(psychologist_id=user_id).first()
        if mi_psicologo:
            db.session.delete(session)
        

        db.session.delete(user)
        db.session.commit()
        return "Usuario eliminado con éxito", 200
    else:
        return "Usuario no encontrado", 404


@api.route("/user-data", methods=['GET', 'PUT'])
@jwt_required()
def handle_user_data():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).one_or_none()
    user_profile_info = UserProfileInfo.query.filter_by(user_id = current_user).one_or_none()
    if request.method == 'GET':
        if user is None:
            return jsonify({"message": "Usuario no encontrado"}), 404
        if user_profile_info is None:
            return jsonify(user.serialize()), 200
        else: 
            user_info = user.serialize()
            profile_info = user_profile_info.serialize()
            full_info = {**user_info,**profile_info }
            return jsonify(full_info), 200 
    if request.method == 'PUT':
        data = request.json
        #data_decode = json.loads(data)
        user.update(data)
        email = data["email"]
        fpv = data["fpv_number"]
        city = data["city"]
        state = data["state"]
        phone_number = data["phone_number"]
        if user_profile_info is None: 
            create_profile_info = UserProfileInfo(
                user_id = current_user,
                fpv_number = fpv,
                city = city,
                state = state,
                phone_number = phone_number,
                
            ) 
            try:
                db.session.add(create_profile_info)
                db.session.commit()
                return jsonify(create_profile_info.serialize()), 201
            except Exception as error:
                db.session.rollback()
                return jsonify(error), 500
        else:
            updated = user_profile_info.update(data)
            return jsonify({"message": "actualizalo", "ok": updated}), 200  
# Route to update profile picture and load it directly from cloudinary.

# @api.route('/usuario/<int:id>', methods=['GET'])
# def handle_user_data_seleccinado(id):
#     users = User.query.all()
#     selecteduser = UserProfileInfo.query.filter_by(id=id).one_or_none()
#     if selecteduser is None:
#         return jsonify({"message": "Experience not found"}), 404
#     return jsonify(selecteduser.serialize()), 200


# @api.route('/usuario/<int:id>', methods=['GET'])
# def handle_user_data_seleccinado(id):
#     selecteduser = UserProfileInfo.query.get(id)
#     return jsonify(selecteduser.serialize()), 200

@api.route("/update_profile_picture", methods=['PUT'])
@jwt_required()
def handle_user_picture():
    current_user = get_jwt_identity()
    user = UserProfileInfo.query.filter_by(id=current_user).one_or_none()
    data = request.json
    if data is not None:
        updated = user.update_profile_picture(data)
        if updated is False:
            return jsonify({"message": "error"}), 404
        else:
            return jsonify({"message": "profile picture updated"}), 200
    else:
        return jsonify({"message": "image didnt load"}), 500


@api.route("/protected")
@jwt_required()
def protected():
    return jsonify(foo="bar")


@api.route("/psicologo-data", methods=['GET'])
@jwt_required()
def handle_user_psicologo():
    if request.method == 'GET':
        users = User.query.filter_by(is_psicologo=True).all()
        users_info = UserProfileInfo.query.filter(UserProfileInfo.fpv_number != "null")
        if users is None:
            return jsonify({"message": "Usuario no encontrado"}), 404
        else:
            users = list(map(lambda user: user.serialize(),users))
            users_info = list(map(lambda user: user.serialize(), users_info))
            full_info = []
            for user in users:
                for info in users_info:
                    if info["user_id"] == user["id"]:
                        info.update(user)
                        full_info.append(info)
            return jsonify(full_info), 200
        
@api.route("/psicologo-data-to-aprove", methods=['GET'])
@jwt_required()
def handle_user_psicologo_to_aprove():
    if request.method == 'GET':
        users = User.query.filter_by(is_psicologo=True).all()
        users_info = UserProfileInfo.query.filter(UserProfileInfo.fpv_number != "null")
        if users is None:
            return jsonify({"message": "Usuario no encontrado"}), 404
        else:
            users = list(map(lambda user: user.serialize(),users))
            users_info = list(map(lambda user: user.serialize(), users_info))
            full_info = []
            for user in users:
                for info in users_info:
                    if info["user_id"] == user["id"]:
                        info.update(user)
                        full_info.append(info)
            return jsonify(full_info), 200

@api.route("/user-psicologo-data/<int:id>", methods=['GET'])
@jwt_required()
def handle_user_data_seleccinado(id):
    selected_user = id
    user = User.query.filter_by(id=selected_user).one_or_none()
    user_profile_info = UserProfileInfo.query.filter_by(
        user_id=selected_user).one_or_none()
    if request.method == 'GET':
        if user is None:
            return jsonify({"message": "Usuario no encontrado"}), 404
        if user_profile_info is None:
            return jsonify(user.serialize()), 200
        else:
            user_info = user.serialize()
            profile_info = user_profile_info.serialize()
            full_info = {**user_info, **profile_info}
            
            return jsonify(full_info), 200
    
@api.route("/sessions/today/client/<int:client_id>", methods=['GET'])
def handle_sessions_client_today(client_id):
    today = date.today()
    # Get the current date and stringify to compare with the value on the database
    current_date = today.strftime("%Y/%m/%d")
    sessions = Session.query.filter_by(
        client_id=client_id).where(current_date == Session.calendar_date).all()
    response = []
    for session in sessions:
        # Serialize session data and include psychologist and patient names
        session_data = session.serialize()
        session_data["psychologist_name"] = session.psychologist.name  # Assuming a psychologist relationship
        session_data["psychologist_last_name"] = session.psychologist.last_name  # Assuming a psychologist relationship
        response.append(session_data)

    if sessions is None:
        return jsonify({"message": "Not sessions available for this Client"}), 401
    else:
        return jsonify(response), 201

@api.route("/sessions/today/<int:psychologist_id>", methods=['GET'])
def handle_sessions_today(psychologist_id):
    today = date.today()
    # Get the current date and stringify to compare with the value on the database
    current_date = today.strftime("%Y/%m/%d")

    # Query sessions for the psychologist on today's date
    sessions = Session.query.filter_by(psychologist_id=psychologist_id).filter(Session.calendar_date == current_date).all()

    response = []
    for session in sessions:
        # Serialize session data and include psychologist and patient names
        session_data = session.serialize()
        session_data["psychologist_name"] = session.psychologist.name  # Assuming a psychologist relationship
        session_data["patient_name"] = session.patient.name  # Assuming a patient relationship
        session_data["psychologist_last_name"] = session.psychologist.last_name  # Assuming a psychologist relationship
        session_data["patient_last_name"] = session.patient.last_name  # Assuming a patient relationship
        response.append(session_data)

    if sessions is None:
        return jsonify({"message": "Not sessions available for this Psychologist"}), 401
    else:
        return jsonify(response), 201
    

# Obtain sessions by the ID of the psicologo. Return all sessions for that piscologo
# traer todas las sesiones del psicologo, para anular los botones
@api.route("/sessions/<int:psychologist_id>/", methods=['GET'])
def handle_get_sessions(psychologist_id):
    sessions = Session.query.filter_by(psychologist_id=psychologist_id ).all()
    response = []
    for session in sessions:
        response.append(session.serialize())
    if sessions is None:
        return jsonify({"message": "Not sessions available for this Psychologist"}), 401
    else:
        return jsonify(response), 201


# Handle the creation of the session by querying if the current user is psychologist
@api.route("/session-create", methods=['POST'])
@jwt_required()
def handle_session_create():
    current_psychologist = get_jwt_identity()
    if request.method == 'POST':
        psychologist = User.query.filter_by(id=current_psychologist).where(
            User.is_psicologo == True).one_or_none()  # Confirma si el usuario actual es psicologo o no
        if psychologist is not None:
            schedule_data = request.json
            schedule_data["psychologist_id"] = psychologist.id
            schedule = Session.create_schedule(schedule_data)
            room_number = os.urandom(20).hex()
            session_data = request.json
            session_data["psychologist_id"] = psychologist.id
            session_data["room_number"] = room_number
            session = Session.create(session_data)
            if session is not None:
                return jsonify({"message": "Session created succesfully", }), 201
            return jsonify({"message": "info error"}), 400
        return jsonify({"message": "user not psychologist"}), 405


# Handle the DELETE, UPDATE of a session by getting the ID of the professor and the Session
@api.route("/schedule-handle/<int:session_id>", methods=['DELETE', 'PUT'])
@jwt_required()
def handle_one_session(session_id):
    current_psychologist = get_jwt_identity()
    psychologist = Session.query.filter_by(psychologist_id=current_psychologist).where(
        Session.id == session_id).one_or_none()  # Verifica si al psicologo actual le pertenece el servicio y si puede borrarlo
    session = Session.query.filter_by(id=session_id).one_or_none()
    if request.method == 'DELETE':
        if psychologist is not None:
            if session is None:
                return jsonify({"message": "Service not found"}), 404
            removed = session.delete()
            if removed == False:
                return jsonify({"status": False, "message": "something happened"}), 500
            else:
                return jsonify({"status": True, "message": "service deleted"}), 204
        else:
            return jsonify({"status": False, "message": "you're not the psychologist of this Session"}), 405
    if request.method == 'PUT':
        if session is not None:
            updated = session.update_session(request.json)
            if updated:
                return jsonify({"message": "service updated"}), 200
            return jsonify({"message": "error"}), 500


# Handle the reservation of the service by a client
@api.route("/session-reserved/<int:session_id>", methods=['PUT'])
@jwt_required()
def handle_reserved_session(session_id):
    current_user = get_jwt_identity()
    # Confirma el id del usuario actual
    user = User.query.filter_by(id=current_user).one_or_none()
    data = request.json
    session = Session.query.filter_by(id=session_id).one_or_none()
    if session is not None:
        # añade el id del usuario actual al response
        data["client_id"] = user.id
        # actualiza la session y le coloca el id del usuario. tambien cambia el estado de reservacion a true
        reserved = session.reserve_session(data)
        if reserved is True:
            return jsonify({"message": "session is reserved"}), 200
        else:
            return jsonify({"message": "error"}), 500
    else:
        return ({"message": "session not found"})


@api.route("/session-unbook/<int:session_id>", methods=['PUT'])
@jwt_required()
def handle_unbook_session(session_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).one_or_none()
    session = Session.query.filter_by(id=session_id).one_or_none()
    data = request.json
    if session is not None:
        data["client_id"] = None
        unbooked = session.reserve_session(data)
        if unbooked is True:
            return jsonify({"message": "Session unbooked"}), 204
        else:
            return jsonify({"message": "error"}), 500

@api.route('/select-psicologo/<int:psychologist_id>', methods=['POST'])
@jwt_required()
def select_psicologo(psychologist_id):
    # Obtén el usuario/cliente actual (seguramente a través de la autenticación)
    user_id = get_jwt_identity()  # Reemplaza con la lógica para obtener el usuario actual
    user = User.query.get(user_id)

    # Verifica que el usuario sea un cliente y actualiza selected_psicologo_id
    if not user.is_psicologo:
        if user.is_psicologo_selected:
            if user.selected_psicologo_id == psychologist_id:
                user.selected_psicologo_id = None
                user.is_psicologo_selected= False
                db.session.commit()
                return jsonify({'message': ' Psicologo deseleccionado exitosamente '}), 200
            return jsonify({'message': 'Deselecciona primero el psiologo en la pestaña mi psicologo'}), 400
        user.selected_psicologo_id = psychologist_id
        user.is_psicologo_selected= True
        db.session.commit()
        return jsonify({'message': 'Psicólogo seleccionado exitosamente'}), 200
    
    return jsonify({'message': 'No se puede seleccionar un psicólogo como cliente'}), 400

# Endpoint para obtener usuarios relacionados con el psicólogo actualmente autenticado
@api.route('/usuarios_relacionados', methods=['GET'])
@jwt_required()
def obtener_usuarios_relacionados():
    user_id = get_jwt_identity()  # Obtiene el ID del usuario actual
    user = User.query.get(user_id)
    if not user.is_psicologo:
        # Asegúrate de que el usuario actual esté autenticado y sea un psicólogo
        return jsonify({'message': 'Acceso no autorizado'}), 403

    # Filtra los resultados por el ID del usuario actual como psicólogo
    clientes_seleccionados = User.query.filter(User.selected_psicologo_id == user_id, User.is_psicologo == False).all()

    # Convierte los resultados en un formato JSON para la respuesta
    resultados = []
    for cliente in clientes_seleccionados:
        resultados.append({
            'id': cliente.id,
            'name': cliente.name,
            'last_name': cliente.last_name,
            # Otras propiedades que deseas incluir en la respuesta
        })

    return jsonify(resultados)

@api.route('/psicologo_relacionado', methods=['GET'])
@jwt_required()
def obtener_psicologo_relacionado():
    id_usuario = get_jwt_identity()  # Obtiene el ID del usuario actual

    usuario = User.query.get(id_usuario)

    # Obtiene los detalles del psicólogo relacionado
    psicologo_relacionado = User.query.get(usuario.selected_psicologo_id)  # Suponiendo que la clave foránea es user.id

    # Verifica si se encontró un psicólogo relacionado
    if psicologo_relacionado is None:
        return jsonify({'message': 'No hay psicólogo relacionado'}), 404  # Código de error 404: Not Found

    # Prepara los datos de la respuesta
    datos_psicologo = {
        'id': psicologo_relacionado.id,
        'name': psicologo_relacionado.name,
        'last_name': psicologo_relacionado.last_name,
        # Otras propiedades del psicólogo (opcional)
    }

    return jsonify(datos_psicologo)


@api.route('/patients/<int:patient_id>/tasks', methods=['POST'])
@jwt_required()
def create_task(patient_id):
    # Autenticar al psicólogo
    user_id = get_jwt_identity()  # Reemplaza con la lógica para obtener el usuario actual
    user = User.query.get(user_id)
    if not user.is_psicologo:
        # Asegúrate de que el usuario actual esté autenticado y sea un psicólogo
        return jsonify({'message': 'Acceso no autorizado'}), 403

    # Validación de datos
    try:
        description = request.json['description']
        if not description:
            raise ValueError('La descripción no puede estar vacía.')
    except KeyError:
        return jsonify({'message': 'Falta la descripción en la solicitud.'}), 400

    # Crear la nueva tarea
    new_task = ClientTask(
        description=description,
        client_id=patient_id,
        # ... otros atributos ...
    )

    # Manejo de errores
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({'message': f'Error al crear la tarea: {error}.'}), 400

    # Devolver la nueva tarea
    return jsonify({
        'id': new_task.id,
        'description': new_task.description,
        # ... otros atributos ...
    }), 201

@api.route('/psychologists/patients/<int:patient_id>/tasks', methods=['GET'])
@jwt_required()
def get_tasks(patient_id):
    # Obtener las tareas
    tasks = ClientTask.query.filter_by(client_id=patient_id).all()
    if not tasks:
        return jsonify({'message': 'No se encontraron tareas'}), 404

    # Devolver las tareas
    return jsonify([task.to_dict() for task in tasks]), 200

@api.route('/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def edit_task(task_id):
    user_id = get_jwt_identity()  # Reemplaza con la lógica para obtener el usuario actual
    user = User.query.get(user_id)
    if not user.is_psicologo:
        # Asegúrate de que el usuario actual esté autenticado y sea un psicólogo
        return jsonify({'message': 'Acceso no autorizado'}), 403
    
    # Buscar la tarea
    task = ClientTask.query.get(task_id)
    if not task:
        return jsonify({'error': 'Tarea no encontrada'}), 404

    # Obtener los datos de la solicitud
    data = request.get_json()

    # Validar los datos manualmente
    if not data or 'description' not in data:
        return jsonify({'error': 'Faltan datos requeridos'}), 400

    # Actualizar los atributos de la tarea
    task.description = data['description']

    # Guardar los cambios en la base de datos
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': 'Error al actualizar la tarea'}), 500

    # Devolver la tarea actualizada
    return jsonify(task.to_dict()), 200

    # Devolver respuesta
    return jsonify(task.to_dict()), 200

@api.route('/tasks/<int:task_id>/complete', methods=['PUT'])
@jwt_required()
def complete_task(task_id):
    # Buscar la tarea
    task = ClientTask.query.get(task_id)
    if not task:
        return jsonify({'error': 'Tarea no encontrada'}), 404

    # Obtener el estado actual
    current_completed_status = task.completed

    # Obtener los datos de la solicitud
    data = request.get_json()

    # Validar los datos
    if not data or 'completed' not in data:
        return jsonify({'error': 'Faltan datos requeridos'}), 400

    # Actualizar el estado solo si es necesario
    if data['completed'] != current_completed_status:
        task.completed = data['completed']

    # Guardar los cambios en la base de datos
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({'error': 'Error al actualizar la tarea'}), 500

    # Mensaje de respuesta personalizado
    if task.completed:
        message = 'Tarea completada'
    else:
        message = 'Tarea marcada como incompleta'

    return jsonify({'message': message}), 200

@api.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = get_jwt_identity()  # Reemplaza con la lógica para obtener el usuario actual
    user = User.query.get(user_id)
    if not user.is_psicologo:
        # Asegúrate de que el usuario actual esté autenticado y sea un psicólogo
        return jsonify({'message': 'Acceso no autorizado'}), 403

    # Buscar la tarea
    task = ClientTask.query.get(task_id)
    if not task:
        return jsonify({'error': 'Tarea no encontrada'}), 404

    # Eliminar la tarea
    db.session.delete(task)
    db.session.commit()

    # Devolver respuesta
    return jsonify({'message': 'Tarea eliminada'}), 200

@api.route('/payment-accounts', methods=['GET', 'PUT'])
@jwt_required()
def handle_payment_account():
    current_user = get_jwt_identity()

    if request.method == 'GET':
        user = User.query.filter_by(id=current_user).one_or_none()
        user_payment_info = PaymentAccount.query.filter_by(user_id = current_user).one_or_none()
        if user is None:
            return jsonify({"message": "Usuario no encontrado"}), 404
        else:
            return jsonify(user_payment_info.serialize()),200

    if request.method == 'PUT':
        data = request.json

        try:
            user_payment_info = PaymentAccount.query.filter_by(user_id = current_user).one_or_none()
            if user_payment_info is None:
                create_payment_account_info = PaymentAccount(
                    user_id=current_user,
                    **data
                )
                db.session.add(create_payment_account_info)
            else:
                user_payment_info.update(data)  # Actualizar la primera cuenta de pago
            db.session.commit()
            return jsonify({"message": "Datos actualizados correctamente"}), 200
        except Exception as error:
            db.session.rollback()
            return jsonify({"message": "Error al actualizar los datos"}), 500
        
@api.route('/psicology-payment-accounts/<int:id>', methods=['GET'])
@jwt_required()
def psicology_payment_account(id):
    psychology_user = id

    user = User.query.filter_by(id=psychology_user).one_or_none()
    if user is None:
            return jsonify({"message": "Usuario no encontrado"}), 404

    user_payment_info = PaymentAccount.query.filter_by(user_id=psychology_user).one_or_none()
    if user_payment_info is None:
        return jsonify({"message": "El usuario no tiene información de pago"}), 200

    return jsonify(user_payment_info.serialize()), 200


@api.route("/user-patient-data/<int:id>", methods=['GET'])
@jwt_required()
def handle_patient_data_seleccinado(id):
    selected_user_id = id

    # Obtiene el usuario actual desde el token JWT
    current_user_id = get_jwt_identity()  # Reemplaza con la función que obtiene el ID del usuario

    # Filtra los usuarios por el ID del psicólogo actual y que no sean psicólogos
    usuario_filtrado = User.query.filter(
        User.id == selected_user_id,
        User.selected_psicologo_id == current_user_id,
        User.is_psicologo == False
    ).first()

    if not usuario_filtrado:
        return jsonify({"message": "Usuario no encontrado o no es paciente del psicólogo actual"}), 404

    # Si el usuario existe, buscamos su perfil
    profile_info = usuario_filtrado.user_info

    if request.method == 'GET':
        if usuario_filtrado is None:
            return jsonify({"message": "Usuario no encontrado"}), 404

        if profile_info is None:
            return jsonify(usuario_filtrado.serialize()), 200
        else:
            user_info = usuario_filtrado.serialize()
            profile_info = profile_info.serialize()
            full_info = {**user_info, **profile_info}
            return jsonify(full_info), 200

@api.route('/patients/own/tasks', methods=['GET'])
@jwt_required()
def get_own_tasks():
    current_user_id = get_jwt_identity()

    # Obtener las tareas del usuario actual
    tasks = ClientTask.query.filter_by(client_id=current_user_id).all()

    # Manejar el caso de no encontrar tareas
    if not tasks:
        return jsonify({'message': 'No se encontraron tareas'}), 404

    # Devolver las tareas
    return jsonify([task.to_dict() for task in tasks]), 200

@api.route("/random-phrase", methods=['GET'])
@jwt_required()
def handle_random_phrase():
    if request.method == 'GET':
        # Get a random phrase using `Phrase.query.order_by(func.random()).first()`
        phrase = Phrase.query.order_by(func.random()).first()  # Assign result to `phrase`

        # Check if a phrase was found before returning
        if phrase:
            return jsonify({"phrase": phrase.serialize()}), 200

        # Return an error message if no phrase was found
        return jsonify({"message": "No se encontraron frases en la base de datos"}), 404

@api.route('/create-roles', methods=['POST'])
def create_role():
    """Crea un nuevo rol."""

    data = request.get_json()
    name = data.get('name')

    if not name:
        return jsonify({"error": "El nombre del rol es obligatorio"}), 400

    role = Role.query.filter_by(name=name).first()
    if role:
        return jsonify({"error": "El nombre del rol ya está en uso"}), 409

    new_role = Role(name=name)
    db.session.add(new_role)
    db.session.commit()

    return jsonify({"success": "Rol creado exitosamente", "role": new_role.serialize()}), 201
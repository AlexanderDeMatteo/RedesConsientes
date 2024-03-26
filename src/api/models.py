from email.policy import default
from enum import unique
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import or_
import string

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    is_psicologo = db.Column(db.Boolean(), unique=False, nullable=True)
    admin = db.Column(db.Boolean(), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False,
                          nullable=False, default=False)
    is_online = db.Column(db.Boolean(), nullable=False, default=False)
    salt = db.Column(db.String(80), unique=True, nullable=False)
    address = db.relationship("UserAddress", backref="user", uselist=False)
    # PaidMethod = db.relationship("UserPaymentMethod", backref="user", uselist=False)
    user_info = db.relationship('UserProfileInfo', backref='user', uselist=False)
    payment_account = db.relationship("PaymentAccount", backref="user", lazy="select")
    session_ids = db.relationship("Session", primaryjoin="and_(User.id == Session.psychologist_id,  User.id == Session.client_id)",)
    # Relación para psicólogos y sus tareas asignadas
    # psychologist_tasks = db.relationship('PsychologistTask', back_populates='psychologist')
    # Relación para clientes y sus tareas asignadas
    tasks_assigned_to_client = db.relationship('ClientTask', back_populates='client')
    # client_tasks = db.relationship('ClientTask', backref='assigned_to_client', foreign_keys='ClientTask.client_id')
    selected_psicologo_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    selected_psicologo = db.relationship('User', remote_side=[id])
    is_psicologo_selected = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "is_psicologo": self.is_psicologo,
            "session_ids": self.session_ids,
            "admin": self.admin,
            "is_active":self.is_active
        }

    @ classmethod
    def create(cls, user):
        try:
            new_user = cls(**user)
            db.session.add(new_user)
            db.session.commit()
            return new_user
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

            # do not serialize the password, its a security breach

    def update(self, ref_user):

        if "name" in ref_user:
            self.name = ref_user["name"]
        if "last_name" in ref_user:
            self.last_name = ref_user["last_name"]
        if "email" in ref_user:
            self.email = ref_user["email"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False




class ClientTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    client_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    client = db.relationship('User', back_populates='tasks_assigned_to_client')

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description,
            "completed": self.completed,
            "client_id": self.client_id,
            "client": self.client,
        }
    def update(self, completed):
        try:
            self.completed = completed
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False
    
    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'completed': self.completed,
            'client_id': self.client_id,
        }


class UserAddress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    psychologist_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), unique=True, nullable=False)

    country = db.Column(db.String(120), unique=False, nullable=True)
    state = db.Column(db.String(120), unique=False, nullable=True)
    city = db.Column(db.String(120), unique=False, nullable=True)
    address = db.Column(db.String(300), nullable=True)
    status = db.Column(db.Boolean(), unique=False,
                       nullable=True, default=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "state": self.state,
            "city": self.city,
            "address": self.address
        }

    def update(self, ref_user):
        if "country" in ref_user:
            self.country = ref_user["country"]
        if "state" in ref_user:
            self.state = ref_user["state"]
        if "city" in ref_user:
            self.city = ref_user["city"]
        if "address" in ref_user:
            self.address = ref_user["address"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False


class UserProfileInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    profile_picture = db.Column(db.String(500), unique=False, nullable=True)
    dob = db.Column(db.String(20), nullable=True)
    dni = db.Column(db.String(30), nullable=True)
    cedula = db.Column(db.String(25), unique=True, nullable=True)
    gender = db.Column(db.String(10), nullable=True)
    monto_consulta = db.Column(db.String(25), unique=False, nullable=True)
    phone_number = db.Column(db.String(25), unique=False, nullable=True)
    fpv_number = db.Column(db.String(25), unique=True, nullable=True)
    specialty_area = db.Column(db.String(120), unique=False, nullable=True)
    city = db.Column(db.String(25), unique=False, nullable=True)
    state = db.Column(db.String(25), unique=False, nullable=True)
    twitter = db.Column(db.String(25), unique=False, nullable=True)
    facebook = db.Column(db.String(25), unique=False, nullable=True)
    instagram = db.Column(db.String(25), unique=False, nullable=True)
    education = db.Column(db.String(140), unique=False, nullable=True)
    motivo_consulta = db.Column(db.String(600), unique=False, nullable=True)
    psych_strategies = db.Column(db.String(1000), unique=False, nullable=True)
    PsychExperiences = db.Column(db.String(1000), unique=False, nullable=True)

    def __init__(self, fpv_number, user_id):
        self.fpv_number = fpv_number,
        self.user_id = user_id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "profile_picture": self.profile_picture,
            "phone_number": self.phone_number,
            "dob": self.dob,
            "cedula": self.cedula,
            "dni": self.dni,
            "gender": self.gender,
            "fpv_number": self.fpv_number,
            "specialty_area": self.specialty_area,
            "city": self.city,
            "state": self.state,
            "twitter": self.twitter,
            "facebook": self.facebook,
            "instagram": self.instagram,
            "education": self.education,
            # "academic_info": [info.serialize() for info in self.academic_info],
            "psych_strategies": self.psych_strategies,
            "PsychExperiences": self.PsychExperiences,
            "monto_consulta" : self.monto_consulta,
            "motivo_consulta" : self.motivo_consulta,
        }

    def update_fpv(self, data):
        if "fpv_number" in data:
            self.fpv_number = data["fpv_number"]
        if "user_id" in data:
            self.user_id = data["user_id"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False

    def update(self, ref_user):
        attributes = [
            "profile_picture", "phone_number", "fpv_number", "specialty_area",
            "twitter", "facebook", "instagram", "state", "city", "education", "dob", "gender",
            "PsychExperiences", "psych_strategies", "monto_consulta", "motivo_consulta", "cedula",
        ]

        for attribute in attributes:
            if attribute in ref_user:
                setattr(self, attribute, ref_user[attribute])

        try:
            db.session.commit()
            return True
        except Exception as error:
            print(error)
            db.session.rollback()
            return False

# Method to update profile picture
    def update_profile_picture(self, data):
        if "profile_picture" in data:
            self.profile_picture = data["profile_picture"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False

class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    psychologist_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    psychologist = db.relationship('User', backref='psychologist_sessions', foreign_keys=[psychologist_id])
    client = db.relationship('User', backref='client_sessions', foreign_keys=[client_id])
    start_time = db.Column(db.String(10), nullable=False, unique=False)
    end_time = db.Column(db.String(10), nullable=False, unique=False)
    duration_time = db.Column(db.Numeric(10), nullable=False, unique=False)
    reserved = db.Column(db.Boolean(), nullable=True, default=False)
    calendar_date = db.Column(db.Date, nullable=False, unique=False)
    room_number = db.Column(db.String(200), nullable=False, unique=True)

    # Method to serialize information of Sessions
    def serialize(self):
        return {
            "id": self.id,
            "psychologist_id": self.psychologist_id,
            "client_id": self.client_id,
            "reserved": self.reserved,
            "calendar_date": self.calendar_date,
            "room_number": self.room_number,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "duration_time":self.duration_time,
            "psychologist_name": self.psychologist.name if self.psychologist else None,  # Handle potential null values
            "patient_name": self.client.name if self.client else None,  # Handle potential null values
            "psychologist_last_name": self.psychologist.last_name if self.psychologist else None,
            "patient_last_name": self.client.last_name if self.client else None,

        }
    
    @classmethod
    def create_schedule(cls, schedules):
        try:
            new_schedule_data = cls(**schedules)
            db.session.add(new_schedule_data)
            db.session.commit()
            return new_schedule_data
        except Exception as error:
            db.session.rollback()
            return error

    # Method to create a new Session
    @classmethod
    def create(cls, data_sessions):
        try:
            new_data_session = cls(**data_sessions)
            db.session.add(new_data_session)
            db.session.commit()
            return new_data_session
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    # Method to delete a Session
    def delete(self):
        db.session.delete(self)
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False

    # Method to update a Session

    def update_session(self, session):
        if "calendar_date" in session:
            self.date = session["calendar_date"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False

    # Handle the reservation for a client
    def reserve_session(self, session):
        if "client_id" in session:
            self.client_id = session["client_id"]
        if "reserved" in session:
            self.reserved = session["reserved"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False


# class PsychoConsultation(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     monto = db.Column(db.String(25), unique=False, nullable=True)


class MiPsicologo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False)
    Psicologo_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False)

class PaymentAccount(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    zell_email = db.Column(db.String(50), nullable=True)
    binance_route = db.Column(db.String(100), nullable=True)
    paypal_user = db.Column(db.String(50), nullable=True)
    paypal_name = db.Column(db.String(50), nullable=True)
    paypal_email = db.Column(db.String(50), nullable=True)
    pagomovil_bank = db.Column(db.String(50), nullable=True)
    pagomovil_ci = db.Column(db.String(50), nullable=True)
    pagomovil_phone = db.Column(db.String(50), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "zell_email": self.zell_email,
            "binance_route": self.binance_route,
            "paypal_user": self.paypal_user,
            "paypal_name": self.paypal_name,
            "paypal_email": self.paypal_email,
            "pagomovil_bank": self.pagomovil_bank,
            "pagomovil_ci": self.pagomovil_ci,
            "pagomovil_phone": self.pagomovil_phone
        }

    @classmethod
    def create(cls, payment_account_data):
        try:
            new_account = cls(**payment_account_data)
            db.session.add(new_account)
            db.session.commit()
            return new_account
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    def update(self, data):
        for key, value in data.items():
            if key in self.__dict__:
                setattr(self, key, value)
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False

    def delete(self):
        db.session.delete(self)
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False

class Phrase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phrase = db.Column(db.String(400), nullable=True)
    author = db.Column(db.String(100), nullable=True)
    

    def serialize(self):
        return {
            "id": self.id,
            "phrase": self.phrase,
            "author": self.author,
        }
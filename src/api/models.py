from email.policy import default
from enum import unique
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import or_
from flask_login import UserMixin
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Numeric, Date, Table
import string

db = SQLAlchemy()

association_table = Table(
    "association_table",
    db.metadata,
    Column('role_id', Integer, ForeignKey('role.id'), primary_key=True),
    Column('permission_id', Integer, ForeignKey('permission.id'), primary_key=True ),
)


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    dni = db.Column(db.String(30), unique=True, nullable=True)
    dob = db.Column(db.String(30), unique=True, nullable=True)
    gender= db.Column(db.String(20), nullable=True)
    phone_number = db.Column(db.String(25), unique=False, nullable=True)
    motivo_consulta = db.Column(db.String(10), nullable=True)
    is_psicologo = db.Column(db.Boolean(), nullable=True)
    profile_picture = db.Column(db.String(500), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), default=False)
    is_online = db.Column(db.Boolean(), default=False)
    # salt = db.Column(db.String(80), unique=True, nullable=False)
    role_name = db.relationship('Role',backref='role_user')
    role_id = Column(Integer, ForeignKey('role.id'))
    user_address = Column(Integer, ForeignKey('address.id'))
    user_socialNetwork = Column(Integer, ForeignKey('socialnetwork.id'))
    psicology_profile = Column(Integer, ForeignKey('psicology_profile.id'))
    # seleccionar psicologo
    selected_psicologo_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    selected_psicologo = db.relationship('User', remote_side=[id])
    is_psicologo_selected = db.Column(db.Boolean, default=False)
    # marketplace = Column(Integer, ForeignKey('marketplace.id'))
    # client_list = Column(Integer, ForeignKey('client_list.id'))
    # factura = Column(Integer, ForeignKey('factura.id'))

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
        "id": self.id,
        "user_address": self.id,
        "user_socialNetwork": self.id,
        "psicology_profile": self.id,
        "email": self.email,
        "name": self.name,
        "last_name": self.last_name,
        "dni" : self.dni,
        "dob" : self.dob,
        "gender" : self.gender,
        "phone_number" : self.phone_number,
        "motivo_consulta" : self.motivo_consulta,
        "is_psicologo": self.is_psicologo,
        "profile_picture": self.profile_picture,
        "is_active": self.is_active,
        "role_id": self.role_id,
        "is_psicologo_selected": self.is_psicologo_selected,
        # "selected_psicologo" : self.selected_psicologo
        }

    def update_profile_picture(self, data):
        print("hola")
        if "profile_picture" in data:
            self.profile_picture = data["profile_picture"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False
        
    def update(self, ref_user):
        attributes = [
            "name", "last_name", "motivo_consulta", "dni"
            "gender", "phone_number"
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

        

class Role(db.Model):
  __tablename__ = 'role'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), unique=True, nullable=True)
  description = db.Column(db.String(250), nullable=True)
#   permission = Column(Integer, ForeignKey('permission.id'))
#   permissions = db.relationship('Permission', backref='permissions',lazy=True)
#   permissions = db.relationship("Permission",
#                     secondary=association_table,
#                     back_populates="roles")
  


class Permission(db.Model):
  __tablename__ = 'permission'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), unique=True, nullable=True)
  description = db.Column(db.String(250), nullable=True)
  role = Column(Integer, ForeignKey('role.id'))
  roles = db.relationship('Role', backref='roles',lazy=True)
#   roles = db.relationship("Role",
#                     secondary=association_table,
#                     back_populates="permissions")
  


class ClientTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=True)
    completed = db.Column(db.Boolean, default=False)
    client_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    client = db.Column(db.Integer, db.ForeignKey('user.id'))

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

class Address(db.Model):
    __tablename__ = "address"
    id = Column(Integer, primary_key=True)
    city = db.Column(db.String(25), unique=False, nullable=True)
    state = db.Column(db.String(25), unique=False, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "city": self.city,
            "state": self.state,
        }


class PsicologyProfileInfo(db.Model):
    __tablename__ = 'psicology_profile'

    id = db.Column(db.Integer, primary_key=True)
    fpv_number = db.Column(db.String(25), unique=True, nullable=True)
    specialty_area = db.Column(db.String(120), unique=False, nullable=True)
    education = db.Column(db.String(140), unique=False, nullable=True)
    monto_consulta = db.Column(db.String(10), unique=False, nullable=True)
    psych_strategies = db.Column(db.String(1000), unique=False, nullable=True)
    PsychExperiences = db.Column(db.String(1000), unique=False, nullable=True)
    socialNetwork_id = Column(Integer, ForeignKey('socialnetwork.id'))

    def serialize(self):
        return {
            "id": self.id,
            "fpv_number": self.fpv_number,
            "specialty_area": self.specialty_area,
            "education": self.education,
            "psych_strategies": self.psych_strategies,
            "PsychExperiences": self.PsychExperiences,
            "monto_consulta" : self.monto_consulta,
        }

    def update(self, ref_user):
        attributes = [
            "fpv_number", "specialty_area", "education", "dni", "gender"
            "PsychExperiences", "psych_strategies", "monto_consulta", "motivo_consulta",
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
        print("hola")
        if "profile_picture" in data:
            self.profile_picture = data["profile_picture"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False

class MiPsicologo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False)
    Psicologo_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False)

class SocialNetwork(db.Model):
    __tablename__ = 'socialnetwork'
    # Here we define columns for the table person
    # Notice that each column is also a normal Python instance attribute.
    id = Column(Integer, primary_key=True)
    tiktok = db.Column(db.String(120), unique=False, nullable=True)
    facebook = db.Column(db.String(120), unique=False, nullable=True)
    instagram = db.Column(db.String(120), unique=False, nullable=True)
    linkedin = db.Column(db.String(120), unique=False, nullable=True)
    x = db.Column(db.String(120), unique=False, nullable=True)

    def serialize(self):
            return {
                "id": self.id,
                "tiktok": self.tiktok,
                "facebook": self.facebook,
                "instagram": self.instagram,
                "linkedin": self.linkedin,
                "x": self.x
            }


class Session(db.Model):
    __tablename__ = 'session'

    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.String(10), nullable=False, unique=False)
    end_time = db.Column(db.String(10), nullable=False, unique=False)
    duration_time = db.Column(db.Numeric(10), nullable=False, unique=False)
    reserved = db.Column(db.Boolean(), nullable=True, default=False)
    calendar_date = db.Column(db.Date, nullable=False, unique=False)
    room_number = db.Column(db.String(200), nullable=False, unique=True)
    # client_name = db.relationship('User',backref='client_name')
    # psycologist_name = db.relationship('User',backref='psycologist_name')
    psychologist_session_id = Column(Integer, ForeignKey('user.id'))
    psychologist = db.relationship('User', backref='psychologist_sessions', foreign_keys=[psychologist_session_id])
    client_session_id = Column(Integer, ForeignKey('user.id'))
    client = db.relationship('User', backref='client_sessions', foreign_keys=[client_session_id])
    session_type = Column(Integer, ForeignKey('session_type.id'))
    session_type_info = db.relationship('Session_type', backref='session_type', foreign_keys=[session_type])

    # Method to serialize information of Sessions
    def serialize(self):
        return {
            "id": self.id,
            "session_type": self.session_type,
            "session_type_info":self.session_type_info,
            "psychologist_session_id": self.psychologist_session_id,
            "client_session_id": self.client_session_id,
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
            "session_type_cost": self.session_type_info.cost if self.session_type_info else None,

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
        if "client_session_id" in session:
            self.client_session_id = session["client_session_id"]
        if "reserved" in session:
            self.reserved = session["reserved"]
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False


class Session_type(db.Model):
    __tablename__ = 'session_type'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(10), nullable=False, unique=False)
    cost = db.Column(db.String(10), nullable=True, unique=False)

    def serialize(self):
        return {
            "id": self.id,
            "type": self.type,
            "cost": self.cost,

        }


# class MiPsicologo(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(
#         'user.id'), nullable=False)
#     Psicologo_id = db.Column(db.Integer, db.ForeignKey(
#         'user.id'), nullable=False)

class PaymentAccount(db.Model):
    __tablename__ = "payment_acount"

    id = db.Column(db.Integer, primary_key=True)
    zell_email = db.Column(db.String(50), nullable=True)
    binance_route = db.Column(db.String(100), nullable=True)
    paypal_user = db.Column(db.String(50), nullable=True)
    paypal_name = db.Column(db.String(50), nullable=True)
    paypal_email = db.Column(db.String(50), nullable=True)
    pagomovil_bank = db.Column(db.String(50), nullable=True)
    pagomovil_ci = db.Column(db.String(50), nullable=True)
    pagomovil_phone = db.Column(db.String(50), nullable=True)
    Psicology_profile_id = Column(Integer, ForeignKey('psicology_profile.id'))

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
    __tablename__ = "phrase"

    id = db.Column(db.Integer, primary_key=True)
    phrase = db.Column(db.String(400), nullable=True)
    author = db.Column(db.String(100), nullable=True)
    

    def serialize(self):
        return {
            "id": self.id,
            "phrase": self.phrase,
            "author": self.author,
        }
    
class Client_List(db.Model):
    __tablename__ = "client_list"
    id = Column(Integer, primary_key=True)   
    psychologist_id = Column(Integer, ForeignKey('user.id'))
    psychologist = db.relationship('User', backref='psychologist_clientlist_id', foreign_keys=[psychologist_id])
    client_id = Column(Integer, ForeignKey('user.id'))
    client = db.relationship('User', backref='client_clientlist_id', foreign_keys=[client_id])

    def serialize(self):
        return {
            "id": self.id,
            "psychologist_name": self.psychologist.name if self.psychologist else None,  # Handle potential null values
            "patient_name": self.client.name if self.client else None,  # Handle potential null values
            "psychologist_last_name": self.psychologist.last_name if self.psychologist else None,
            "patient_last_name": self.client.last_name if self.client else None,
        }

class Factura(db.Model):
    __tablename__ = "factura"
    
    id = db.Column(db.Integer, primary_key=True)
    facturacion = db.Column(db.String(400), nullable=True)
    product = db.Column(db.String(400), nullable=True)
    status = db.Column(db.Boolean(), nullable=True)
    cost = db.Column(db.String(400), nullable=True)
    psychologist_id = Column(Integer, ForeignKey('user.id'))
    psychologist = db.relationship('User', backref='psychologist_id_factura', foreign_keys=[psychologist_id])
    client_id = Column(Integer, ForeignKey('user.id'))
    client = db.relationship('User', backref='client_id_factura', foreign_keys=[client_id])

    def serialize(self):
        return {
            "id": self.id,
            "facturacion": self.facturacion,
            "product": self.product,
            "status": self.status,
            "cost": self.cost,
            "psychologist_name": self.psychologist.name if self.psychologist else None,  # Handle potential null values
            "patient_name": self.client.name if self.client else None,  # Handle potential null values
            "psychologist_last_name": self.psychologist.last_name if self.psychologist else None,
            "patient_last_name": self.client.last_name if self.client else None,
        }
class Marketplace(db.Model):
    __tablename__ = "marketplace"

    id = db.Column(db.Integer, primary_key=True)
    product = db.Column(db.String(400), nullable=True)
    description = db.Column(db.String(400), nullable=True)
    status = db.Column(db.Boolean(), nullable=True)
    cost = db.Column(db.String(400), nullable=True)
    psychologist_id_marketplace = Column(Integer, ForeignKey('user.id'))
    psychologist = db.relationship('User', backref='psychologist_id', foreign_keys=[psychologist_id_marketplace])
    client_id_marketplace = Column(Integer, ForeignKey('user.id'))
    client = db.relationship('User', backref='client_id', foreign_keys=[client_id_marketplace])

    def serialize(self):
        return {
            "id": self.id,
            "product": self.product,
            "description": self.description,
            "status": self.status,
            "cost": self.cost,
            "psychologist_name": self.psychologist.name if self.psychologist else None,  # Handle potential null values
            "patient_name": self.client.name if self.client else None,  # Handle potential null values
            "psychologist_last_name": self.psychologist.last_name if self.psychologist else None,
            "patient_last_name": self.client.last_name if self.client else None,
        }
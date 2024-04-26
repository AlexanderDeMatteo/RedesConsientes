from email.policy import default
from enum import unique
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import or_
from flask_login import UserMixin
from sqlalchemy import Column, Integer, ForeignKey
import string

db = SQLAlchemy()

roles_permissions = db.Table(
  'roles_permissions',
  db.Column('role_id', db.Integer, db.ForeignKey('roles.id'), primary_key=True),
  db.Column('permission_id', db.Integer, db.ForeignKey('permissions.id'), primary_key=True )
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    is_psicologo = db.Column(db.Boolean(), nullable=True)
    admin = db.Column(db.Boolean(), nullable=True)
    is_active = db.Column(db.Boolean(), default=False)
    is_online = db.Column(db.Boolean(), default=False)
    salt = db.Column(db.String(80), unique=True, nullable=False)
    # user_info = db.relationship('UserProfileInfo', backref='user', uselist=False)
    # payment_account = db.relationship("PaymentAccount", backref="user", lazy="select")
    # session_ids = db.relationship("Session", primaryjoin="and_(User.id == Session.psychologist_id, User.id == Session.client_id)",)
    # tasks_assigned_to_client = db.relationship('ClientTask', back_populates='client')

    # Removed circular foreign key relationship
    # selected_psicologo_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # selected_psicologo = db.relationship('User', remote_side=[id])
    # is_psicologo_selected = db.Column(db.Boolean, default=False)

    # Relationship with roles (assuming roles have predefined permissions)
    role_ids = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=True)
    roles2 = db.relationship('Role', secondary=roles_permissions,backref=db.backref('users', lazy='dynamic'), lazy='dynamic')
    roles = db.relationship(
        "Role",
        secondary=roles_permissions,  # Assuming roles_permissions exists
        backref="users",
        lazy="select"
    )

    permissions = db.relationship(  # Optional if roles have predefined permissions
        "Permission",
        # Secondary table or direct relationship definition (consider your approach)
        backref="users",
        lazy="select"
    )

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        user = User.query.options(db.joinedload('roles'), db.joinedload('permissions')).get(self.id)

        if user:
            roles = [role.name for role in user.roles or []]
            permissions = [permission.name for permission in user.permissions or []]
            return {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "last_name": user.last_name,
                "is_psicologo": user.is_psicologo,
                "session_ids": user.session_ids,
                "admin": user.admin,
                "is_active": user.is_active,
                "roles": roles,
                "permissions": permissions
            }
        else:
            return None

    def has_permission(self, permission_name):
        return permission_name in {permission.name for permission in self.permissions}
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

    @classmethod
    def create(cls, user):
        try:
            new_user = cls(**user)
            new_user.password = generate_password_hash(user['password'], method='sha256')
            db.session.add(new_user)
            db.session.commit()
            return new_user
        except Exception as error:
            db.session.rollback()
            print(f"Error al crear usuario: {error}")
            return None

    def update(self, ref_user):
        if "name" in ref_user:
            self.name = ref_user["name"]
        if "last_name" in ref_user:
            self.last_name = ref_user["last_name"]
        if "email" in ref_user:
            self.email = ref_user["email"]
        if "password" in ref_user:
            self.password = generate_password_hash(ref_user['password'], method='sha256')
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            print(f"Error al actualizar usuario: {error}")
            return False
        
        
    @classmethod
    def assign_role(cls, user_id, role_name):
        user = User.query.get(user_id)
        role = Role.query.filter_by(name=role_name).first()
        if user and role:
            user.assigned_roles.append(role)
            db.session.commit()
            return True
        else:
            return False

class Role(db.Model):
  __tablename__ = 'roles'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), unique=True, nullable=False)
  description = db.Column(db.Text, nullable=True)

  def __repr__(self):
    return f'<Role {self.name}>'
  
  def assign_user(self, user):
    if not self.users.filter(User.id == user.id).first():
        self.users.append(user)
        db.session.commit()

  def remove_user(self, user):
    if self.users.filter(User.id == user.id).first():
        self.users.remove(user)
        db.session.commit()

  def has_permission(self, permission_name):
    return permission_name in {permission.name for permission in self.permissions}
  
  def serialize(self):
    return {
        "id": self.id,
        "name": self.name,
        "description": self.description,
        "permissions": [permission.name for permission in self.permissions or []]
    }
  


class Permission(db.Model):
  __tablename__ = 'permissions'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), unique=True, nullable=False)
  description = db.Column(db.Text, nullable=True)

  def __repr__(self):
    return f'<Permission {self.name}>'
  
  def serialize(self):
    return {
        "id": self.id,
        "name": self.name,
        "description": self.description
    }



class ClientTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    client_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    client = db.relationship('User', backref='tasks_assigned_to_client')

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



class UserProfileInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.relationship("User", backref='user_info', uselist=False)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), unique=True, nullable=False)
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

    def __init__(self, user_id, **kwargs):  # Use kwargs for optional attributes
        self.user_id = user_id
        for key, value in kwargs.items():
            setattr(self, key, value)

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
    user_payment_account = db.relationship("User", backref="payment_account", lazy="select")
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
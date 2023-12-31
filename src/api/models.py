from email.policy import default
from enum import unique
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import or_

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    is_psicologo = db.Column(db.Boolean(), unique=False, nullable=True)
    is_active = db.Column(db.Boolean(), unique=False,
                          nullable=False, default=False)
    is_online = db.Column(db.Boolean(), nullable=False, default=False)
    salt = db.Column(db.String(80), unique=True, nullable=False)
    address = db.relationship("UserAddress", backref="user", uselist=False)
    # PaidMethod = db.relationship("UserPaymentMethod", backref="user", uselist=False)
    user_info = db.relationship('UserProfileInfo', backref='user', uselist=False)
    session_ids = db.relationship("Session", primaryjoin="and_(User.id == Session.psychologist_id,  User.id == Session.client_id)",)
    # schedule_id = db.relationship('Schedule', backref='user', uselist=False)

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

# class UserPaymentMethod(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(
#         'user.id'), unique=True, nullable=False)

#     name = db.Column(db.String(120), unique=False, nullable=True)
#     email = db.Column(db.String(120), unique=False, nullable=True)
#     username = db.Column(db.String(120), unique=False, nullable=True)
#     numero_telefono = db.Column(db.String(300), nullable=True)
#     usdt = db.Column(db.Boolean(), unique=False, nullable=True, default=False)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "name": self.name,
#             "email": self.email,
#             "username": self.username,
#             "numero_telefono": self.numero_telefono,
#             "usdt": self.usdt,
#         }

    # def update(self, ref_user):
    #     if "name" in ref_user:
    #         self.name = ref_user["name"]
    #     if "email" in ref_user:
    #         self.email = ref_user["email"]
    #     if "username" in ref_user:
    #         self.username = ref_user["username"]
    #     if "numero_telefono" in ref_user:
    #         self.numero_telefono = ref_user["numero_telefono"]
    #     if "usdt" in ref_user:
    #         self.usdt = ref_user["usdt"]
    #     try:
    #         db.session.commit()
    #         return True
    #     except Exception as error:
    #         db.session.rollback()
    #         return False

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
    # TodoList_info = db.relationship(
    #     'TodoList', backref='userprofileinfo', uselist=True)
    # TodoListContainer_info = db.relationship(
    #     'TodoListContainer', backref='userprofileinfo', uselist=True)    
    # experience = db.relationship(
    #     "PsychExperiences", uselist=False, backref="userprofileinfo")
    # psych_strategies = db.relationship(
    #     'PsychTherapeuticStrategies', backref='userprofileinfo', uselist=True)

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





# class Schedule(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     psychologist_id = db.Column(
#         db.Integer, db.ForeignKey('user.id'), nullable=False)
#     # schedule_reserved_id = db.relationship(
#     #     'ScheduleReserved', backref='schedule', uselist=True)

#     start_time = db.Column(db.String(10), nullable=False, unique=False)
#     end_time = db.Column(db.String(10), nullable=False, unique=False)
#     # session_id = db.relationship(
#     #     "Session", back_populates="schedule", uselist=False)
#     sessions = db.relationship(
#         "Session", back_populates="schedule", uselist=False)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "psychologist_id": self.psychologist_id,
#             "start_time": self.start_time,
#             "end_time": self.end_time,
#         }

#     @classmethod
#     def create_schedule(cls, schedules):
#         try:
#             new_schedule_data = cls(**schedules)
#             db.session.add(new_schedule_data)
#             db.session.commit()
#             return new_schedule_data
#         except Exception as error:
#             db.session.rollback()
#             return error

#     def delete_schedule(self):
#         db.session.delete(self)
#         try:
#             db.session.commit()
#             return True
#         except Exception as error:
#             db.session.rollback()
#             return False

#     def update_schedule(self, schedule):
#         if "start_time" in schedule:
#             self.start_time = schedule["start_time"]
#         if "end_time" in schedule:
#             self.end_time = schedule["end_time"]
#         try:
#             db.session.commit()
#             return True
#         except Exception as error:
#             db.session.rollback()
#             return False


class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    psychologist_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    # schedule_id = db.Column(db.ForeignKey('schedule.id'),
    #                         nullable=False, unique=False)
    # schedule = db.relationship("Schedule", back_populates="sessions")
    start_time = db.Column(db.String(10), nullable=False, unique=False)
    end_time = db.Column(db.String(10), nullable=False, unique=False)
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


class PsychoConsultation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    monto = db.Column(db.String(25), unique=False, nullable=True)


class PsychAcademicInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey(
        'user_profile_info.user_id'), nullable=False)
    description = db.Column(db.String(300))
    institute = db.Column(db.String(100))
    graduation_date = db.Column(db.String(30))
    certificate_url = db.Column(db.String(300))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "institute": self.institute,
            "description": self.description,
            "graduation_date": self.graduation_date,
            "certificate_url": self.certificate_url
        }

    # Method to create academic information
    @classmethod
    def create(cls, academic_info):
        try:
            new_academic_info = cls(**academic_info)
            db.session.add(new_academic_info)
            db.session.commit()
            return new_academic_info
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    # Method to delete academic information
    def delete(self):
        db.session.delete(self)
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False

    # Method to update a academic info of an Psychologist
    def update(self, info):
        if "institute" in info:
            self.institute = info["institute"]
        if "description" in info:
            self.description = info["description"]
        if "graduation_date" in info:
            self.graduation_date = info["graduation_date"]
        if "certificate_url" in info:
            self.certificate_url = info["certificate_url"]

        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            print(error)
            return False


class PsychExperiences(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user_profile_info.user_id'), nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "description": self.description
        }

    # Method to create experience information
    @classmethod
    def create(cls, experience_info):
        try:
            new_experience_info = cls(**experience_info)
            db.session.add(experience_info)
            db.session.commit()
            return new_experience_info
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    # Method to delete experience information
    def delete(self):
        db.session.delete(self)
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False

    # Method to update a experience info of an Psychologist
    def update(self, xp):
        if "description" in xp:
            self.description = xp["description"]

        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            print(error)
            return False


class PsychTherapeuticStrategies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(500))
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user_profile_info.user_id'), nullable=False)
    url = db.Column(db.String(300))
    __table_args__ = (db.UniqueConstraint(
        'user_id',
        'url',
        'description',
        name='unique_psych_image_url'
    ),)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "url": self.url,
            "description": self.description
        }

    # Method to create strategie information
    @classmethod
    def create(cls, strategie):
        try:
            new_strategie = cls(**strategie)
            db.session.add(strategie)
            db.session.commit()
            return strategie
        except Exception as error:
            db.session.rollback()
            print(error)
            return None

    # Method to delete strategie information
    def delete(self):
        db.session.delete(self)
        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            return False

    # Method to update a strategie info of an Psychologist
    def update(self, strategie):
        if "description" in strategie:
            self.description = strategie["description"],
        if "url" in strategie:
            self.url = strategie['url']

        try:
            db.session.commit()
            return True
        except Exception as error:
            db.session.rollback()
            print(error)
            return False


class TodoList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer,  db.ForeignKey(
    #     'user_profile_info.user_id'), nullable=False)
    todo_description = db.Column(db.String(300))
    done = db.Column(db.Boolean(False))

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "todo_description": self.description,
            "done": self.done,
        }

class TodoListContainer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer,  db.ForeignKey(
    #     'user_profile_info.user_id'), nullable=False)
    todo_list = db.Column(db.String(300))


    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "todo_list": self.description,
        }

class MiPsicologo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False)
    Psicologo_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False)

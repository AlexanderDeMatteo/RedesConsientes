  
import os
from flask_admin import Admin
from .models import db, User, UserProfileInfo, Session, ClientTask, PaymentAccount, Phrase
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(UserProfileInfo, db.session))
    # admin.add_view(ModelView(PsychAcademicInfo, db.session))
    admin.add_view(ModelView(Session, db.session))
    # admin.add_view(ModelView(PsychExperiences, db.session))
    # admin.add_view(ModelView(PsychTherapeuticStrategies, db.session))
    # admin.add_view(ModelView(TodoList, db.session))
    # admin.add_view(ModelView(TodoListContainer, db.session))
    admin.add_view(ModelView(ClientTask, db.session))
    admin.add_view(ModelView(Phrase, db.session))
    admin.add_view(ModelView(PaymentAccount, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
  
import os
from flask_admin import Admin
from .models import db, User, PsicologyProfileInfo,Notification, Client_List, MiPsicologo, Marketplace, ClientTask, Factura, Session, Session_type, SocialNetwork, ClientTask, PaymentAccount, Phrase, Role, Permission, Address
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Role, db.session))
    admin.add_view(ModelView(Permission, db.session))
    admin.add_view(ModelView(Address, db.session))
    admin.add_view(ModelView(PsicologyProfileInfo, db.session))
    admin.add_view(ModelView(SocialNetwork, db.session))
    admin.add_view(ModelView(Client_List, db.session))
    admin.add_view(ModelView(MiPsicologo, db.session))
    admin.add_view(ModelView(ClientTask, db.session))
    admin.add_view(ModelView(Session, db.session))
    admin.add_view(ModelView(Session_type, db.session))
    admin.add_view(ModelView(Factura, db.session))
    admin.add_view(ModelView(Marketplace, db.session))
    admin.add_view(ModelView(PaymentAccount, db.session))
    admin.add_view(ModelView(Phrase, db.session))
    admin.add_view(ModelView(Notification, db.session))
    # admin.add_view(ModelView(NotificationType, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
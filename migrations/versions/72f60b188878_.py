"""empty message

Revision ID: 72f60b188878
Revises: 
Create Date: 2024-04-09 20:40:39.947851

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '72f60b188878'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('phrase',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('phrase', sa.String(length=400), nullable=True),
    sa.Column('author', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('role',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=256), nullable=False),
    sa.Column('is_psicologo', sa.Boolean(), nullable=True),
    sa.Column('admin', sa.Boolean(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_online', sa.Boolean(), nullable=False),
    sa.Column('salt', sa.String(length=80), nullable=False),
    sa.Column('selected_psicologo_id', sa.Integer(), nullable=True),
    sa.Column('is_psicologo_selected', sa.Boolean(), nullable=True),
    sa.Column('role_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['role_id'], ['role.id'], ),
    sa.ForeignKeyConstraint(['selected_psicologo_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('salt')
    )
    op.create_table('client_task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=False),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('client_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['client_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('mi_psicologo',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('Psicologo_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['Psicologo_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('payment_account',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('zell_email', sa.String(length=50), nullable=True),
    sa.Column('binance_route', sa.String(length=100), nullable=True),
    sa.Column('paypal_user', sa.String(length=50), nullable=True),
    sa.Column('paypal_name', sa.String(length=50), nullable=True),
    sa.Column('paypal_email', sa.String(length=50), nullable=True),
    sa.Column('pagomovil_bank', sa.String(length=50), nullable=True),
    sa.Column('pagomovil_ci', sa.String(length=50), nullable=True),
    sa.Column('pagomovil_phone', sa.String(length=50), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('session',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('psychologist_id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=True),
    sa.Column('start_time', sa.String(length=10), nullable=False),
    sa.Column('end_time', sa.String(length=10), nullable=False),
    sa.Column('duration_time', sa.Numeric(precision=10), nullable=False),
    sa.Column('reserved', sa.Boolean(), nullable=True),
    sa.Column('calendar_date', sa.Date(), nullable=False),
    sa.Column('room_number', sa.String(length=200), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['psychologist_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('room_number')
    )
    op.create_table('user_address',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('psychologist_id', sa.Integer(), nullable=False),
    sa.Column('country', sa.String(length=120), nullable=True),
    sa.Column('state', sa.String(length=120), nullable=True),
    sa.Column('city', sa.String(length=120), nullable=True),
    sa.Column('address', sa.String(length=300), nullable=True),
    sa.Column('status', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['psychologist_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('psychologist_id')
    )
    op.create_table('user_profile_info',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('profile_picture', sa.String(length=500), nullable=True),
    sa.Column('dob', sa.String(length=20), nullable=True),
    sa.Column('dni', sa.String(length=30), nullable=True),
    sa.Column('cedula', sa.String(length=25), nullable=True),
    sa.Column('gender', sa.String(length=10), nullable=True),
    sa.Column('monto_consulta', sa.String(length=25), nullable=True),
    sa.Column('phone_number', sa.String(length=25), nullable=True),
    sa.Column('fpv_number', sa.String(length=25), nullable=True),
    sa.Column('specialty_area', sa.String(length=120), nullable=True),
    sa.Column('city', sa.String(length=25), nullable=True),
    sa.Column('state', sa.String(length=25), nullable=True),
    sa.Column('twitter', sa.String(length=25), nullable=True),
    sa.Column('facebook', sa.String(length=25), nullable=True),
    sa.Column('instagram', sa.String(length=25), nullable=True),
    sa.Column('education', sa.String(length=140), nullable=True),
    sa.Column('motivo_consulta', sa.String(length=600), nullable=True),
    sa.Column('psych_strategies', sa.String(length=1000), nullable=True),
    sa.Column('PsychExperiences', sa.String(length=1000), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('cedula'),
    sa.UniqueConstraint('fpv_number'),
    sa.UniqueConstraint('user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_profile_info')
    op.drop_table('user_address')
    op.drop_table('session')
    op.drop_table('payment_account')
    op.drop_table('mi_psicologo')
    op.drop_table('client_task')
    op.drop_table('user')
    op.drop_table('role')
    op.drop_table('phrase')
    # ### end Alembic commands ###
"""empty message

Revision ID: fb1c447fcd55
Revises: 
Create Date: 2024-06-12 14:27:53.785780

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fb1c447fcd55'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('address',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('city', sa.String(length=25), nullable=True),
    sa.Column('state', sa.String(length=25), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('factura',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('facturacion', sa.String(length=400), nullable=True),
    sa.Column('product', sa.String(length=400), nullable=True),
    sa.Column('status', sa.Boolean(), nullable=True),
    sa.Column('cost', sa.String(length=400), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('marketplace',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product', sa.String(length=400), nullable=True),
    sa.Column('description', sa.String(length=400), nullable=True),
    sa.Column('status', sa.Boolean(), nullable=True),
    sa.Column('cost', sa.String(length=400), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('phrase',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('phrase', sa.String(length=400), nullable=True),
    sa.Column('author', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('role',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=True),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('session_type',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=10), nullable=False),
    sa.Column('cost', sa.String(length=10), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('socialnetwork',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=True),
    sa.Column('url', sa.String(length=120), nullable=True),
    sa.Column('icon', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('permission',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=True),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.Column('role', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['role'], ['role.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('psicology_profile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fpv_number', sa.String(length=25), nullable=True),
    sa.Column('specialty_area', sa.String(length=120), nullable=True),
    sa.Column('education', sa.String(length=140), nullable=True),
    sa.Column('monto_consulta', sa.String(length=10), nullable=True),
    sa.Column('psych_strategies', sa.String(length=1000), nullable=True),
    sa.Column('PsychExperiences', sa.String(length=1000), nullable=True),
    sa.Column('socialNetwork_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['socialNetwork_id'], ['socialnetwork.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('fpv_number')
    )
    op.create_table('association_table',
    sa.Column('role_id', sa.Integer(), nullable=False),
    sa.Column('permission_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['permission_id'], ['permission.id'], ),
    sa.ForeignKeyConstraint(['role_id'], ['role.id'], ),
    sa.PrimaryKeyConstraint('role_id', 'permission_id')
    )
    op.create_table('payment_acount',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('zell_email', sa.String(length=50), nullable=True),
    sa.Column('binance_route', sa.String(length=100), nullable=True),
    sa.Column('paypal_user', sa.String(length=50), nullable=True),
    sa.Column('paypal_name', sa.String(length=50), nullable=True),
    sa.Column('paypal_email', sa.String(length=50), nullable=True),
    sa.Column('pagomovil_bank', sa.String(length=50), nullable=True),
    sa.Column('pagomovil_ci', sa.String(length=50), nullable=True),
    sa.Column('pagomovil_phone', sa.String(length=50), nullable=True),
    sa.Column('Psicology_profile_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['Psicology_profile_id'], ['psicology_profile.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=256), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=True),
    sa.Column('dni', sa.String(length=30), nullable=True),
    sa.Column('gender', sa.String(length=20), nullable=True),
    sa.Column('phone_number', sa.String(length=25), nullable=True),
    sa.Column('motivo_consulta', sa.String(length=10), nullable=True),
    sa.Column('is_psicologo', sa.Boolean(), nullable=True),
    sa.Column('profile_picture', sa.String(length=500), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('is_online', sa.Boolean(), nullable=True),
    sa.Column('role_id', sa.Integer(), nullable=True),
    sa.Column('user_address', sa.Integer(), nullable=True),
    sa.Column('psicology_profile', sa.Integer(), nullable=True),
    sa.Column('Marketplace', sa.Integer(), nullable=True),
    sa.Column('factura', sa.Integer(), nullable=True),
    sa.Column('selected_psicologo_id', sa.Integer(), nullable=True),
    sa.Column('is_psicologo_selected', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['Marketplace'], ['marketplace.id'], ),
    sa.ForeignKeyConstraint(['factura'], ['factura.id'], ),
    sa.ForeignKeyConstraint(['psicology_profile'], ['psicology_profile.id'], ),
    sa.ForeignKeyConstraint(['role_id'], ['role.id'], ),
    sa.ForeignKeyConstraint(['selected_psicologo_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['user_address'], ['address.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('dni'),
    sa.UniqueConstraint('email')
    )
    op.create_table('client_list',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['client_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('client_task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=True),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('client_id', sa.Integer(), nullable=True),
    sa.Column('client', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['client'], ['user.id'], ),
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
    op.create_table('session',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('start_time', sa.String(length=10), nullable=False),
    sa.Column('end_time', sa.String(length=10), nullable=False),
    sa.Column('duration_time', sa.Numeric(precision=10), nullable=False),
    sa.Column('reserved', sa.Boolean(), nullable=True),
    sa.Column('calendar_date', sa.Date(), nullable=False),
    sa.Column('room_number', sa.String(length=200), nullable=False),
    sa.Column('psychologist_session_id', sa.Integer(), nullable=True),
    sa.Column('client_session_id', sa.Integer(), nullable=True),
    sa.Column('session_type', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['client_session_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['psychologist_session_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['session_type'], ['session_type.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('room_number')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('session')
    op.drop_table('mi_psicologo')
    op.drop_table('client_task')
    op.drop_table('client_list')
    op.drop_table('user')
    op.drop_table('payment_acount')
    op.drop_table('association_table')
    op.drop_table('psicology_profile')
    op.drop_table('permission')
    op.drop_table('socialnetwork')
    op.drop_table('session_type')
    op.drop_table('role')
    op.drop_table('phrase')
    op.drop_table('marketplace')
    op.drop_table('factura')
    op.drop_table('address')
    # ### end Alembic commands ###
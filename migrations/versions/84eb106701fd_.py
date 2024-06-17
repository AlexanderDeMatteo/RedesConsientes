"""empty message

Revision ID: 84eb106701fd
Revises: fb1c447fcd55
Create Date: 2024-06-12 14:52:03.220360

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '84eb106701fd'
down_revision = 'fb1c447fcd55'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('factura', schema=None) as batch_op:
        batch_op.add_column(sa.Column('psychologist_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('client_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'user', ['psychologist_id'], ['id'])
        batch_op.create_foreign_key(None, 'user', ['client_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('factura', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('client_id')
        batch_op.drop_column('psychologist_id')

    # ### end Alembic commands ###

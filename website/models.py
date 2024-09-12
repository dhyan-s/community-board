from . import db
from flask_login import UserMixin

votes = db.Table('votes',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('vote_id', db.Integer, db.ForeignKey('vote.id'), primary_key=True)
)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    firstname = db.Column(db.String(150))
    is_admin = db.Column(db.Boolean)
    voted_votes = db.relationship("Vote", secondary=votes, backref="voters_list")
    

class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(500))
    description = db.Column(db.String(10000))
    deadline = db.Column(db.Date, nullable=True)
    tags = db.Column(db.String(1000))
    completed = db.Column(db.Boolean)
    
    

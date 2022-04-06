from operator import truediv
from database import db

class Breakfast(db.Model):
    id=db.Column(db.Integer, primary_key=True, nullable=False)
    category=db.Column(db.Text, unique=False, nullable=False)
    name = db.Column(db.Text, unique=True, nullable=False)
    price = db.Column(db.Float, unique=False, nullable=False)
    
    def __init__(self, name, price, category):
        self.name = name
        self.price = price
        self.category = category
        
class LunchDinner(db.Model):
    id=db.Column(db.Integer, primary_key=True, nullable=False)
    category=db.Column(db.Text, unique=False, nullable=False)
    name = db.Column(db.Text, unique=True, nullable=False)
    price = db.Column(db.Float, unique=False, nullable=False)
    
    def __init__(self, name, price, category):
        self.name = name
        self.price = price
        self.category = category
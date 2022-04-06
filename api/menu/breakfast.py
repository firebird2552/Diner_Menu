from flask import request
from database import db, app

from models.menus import LunchDinner, Breakfast
from schemas.menu import lunches_dinners_schema, breakfasts_schema, lunch_dinner_schema, breakfast_schema

@app.route('/breakfast_item', methods=["POST"])
def createBreakfastItem():
    Breakfast.__table__.create(db.session.bind, checkfirst=True)
    name = request.json['name']
    price = request.json['price']
    
    new_item = Breakfast(name=name, price=price)
    db.session.add(new_item)
    db.session.commit()
    
    item = Breakfast.query.get(new_item.id)
    
    return breakfast_schema.jsonify(item)

@app.route('/breakfast', methods=["GET"])
def getBreakfastMenu():
    
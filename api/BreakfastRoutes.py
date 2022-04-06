from flask import request
from database import db, app

from MenuModels import Breakfast
from MenuSchemas import breakfasts_schema, breakfast_schema

@app.route('/breakfast_item', methods=["POST"])
def createBreakfastItem():
    Breakfast.__table__.create(db.session.bind, checkfirst=True)
    name = request.json['name']
    price = request.json['price']
    category = request.json['category']
    
    new_item = Breakfast(name=name, price=price, category=category)
    db.session.add(new_item)
    db.session.commit()
    
    item = Breakfast.query.get(new_item.id)
    
    return breakfast_schema.jsonify(item)

@app.route('/breakfast', methods=["GET"])
def getBreakfastMenu():
    breakfast_menu = Breakfast.query.all()
    return breakfasts_schema.jsonify(breakfast_menu)

@app.route('/breakfast_item/<id>', methods=["PUT"])
def updateBreakfastItem(id):
    item = Breakfast.query.get(id)
    name = request.json('name')
    price = request.json('price')
    category = request.json('category')
    item.name = name
    item.price = price
    item.category = category
    
    db.session.commit()
    
    updatedItem = Breakfast.query.get(item.id)
    return breakfast_schema.jsonify(updatedItem)

@app.route('/breakfast_item/<id>', methods=["DELETE"])
def removeBreakfastItem(id):
    item = Breakfast.query.get(id)
    db.session.delete(item)
    db.session.commit()
    
    return breakfast_schema.jsonify(item)
                               
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
    meal_segment = request.json['segment']
    
    new_item = Breakfast(name=name, price=price, category=category, mealSegment=meal_segment)
    db.session.add(new_item)
    db.session.commit()
    
    item = Breakfast.query.get(new_item.id)
    
    return breakfast_schema.jsonify(item)

@app.route('/breakfast/entrees', methods=["GET"])
def getBreakfastEntrees():
    
    print("Request URL: ", request.url)
    
    breakfast_menu = Breakfast.query.filter(Breakfast.meal_segment.like('Entree'))
    print(breakfast_menu)
    return breakfasts_schema.jsonify(breakfast_menu)

@app.route('/breakfast/sides', methods=["GET"])
def getBreakfastSides():
    
    print("Request URL: ", request.url)
    
    breakfast_menu = Breakfast.query.filter(Breakfast.meal_segment.like('Side'))
    print(breakfast_menu)
    return breakfasts_schema.jsonify(breakfast_menu)

@app.route('/breakfast', methods=["GET"])
def getBreakfastMenu():
    breakfast_menu = Breakfast.query.all()
    print(breakfast_menu)
    return breakfasts_schema.jsonify(breakfast_menu)

@app.route('/breakfast_item/<id>', methods=["PUT"])
def updateBreakfastItem(id):
    item = Breakfast.query.get(id)
    
    itemName = request.json['name']
    price = request.json['price']
    category = request.json['category']
    meal_segment = request.json['segment']
    
    item.name = itemName
    item.price = price
    item.category = category
    item.meal_segment = meal_segment
    
    db.session.commit()
    
    updatedItem = Breakfast.query.get(id)
    return breakfast_schema.jsonify(updatedItem)

@app.route('/breakfast_item/<id>', methods=["DELETE"])
def removeBreakfastItem(id):
    item = Breakfast.query.get(id)
    db.session.delete(item)
    db.session.commit()
    
    return breakfast_schema.jsonify(item)
                               
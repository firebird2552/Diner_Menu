from flask import request
from database import db, app

from MenuModels import LunchDinner
from MenuSchemas import lunches_dinners_schema, lunch_dinner_schema

@app.route('/lunch_item', methods=["POST"])
def createlunch_dinnerItem():
    LunchDinner.__table__.create(db.session.bind, checkfirst=True)
    name = request.json['name']
    price = request.json['price']
    category = request.json['category']
    meal_segment = request.json['segment']
    
    new_item = LunchDinner(name=name, price=price, category=category, mealSegment=meal_segment)
    db.session.add(new_item)
    db.session.commit()
    
    item = LunchDinner.query.get(new_item.id)
    
    return lunch_dinner_schema.jsonify(item)

@app.route('/lunch/entrees', methods=["GET"])
def getlunchdinnerEntrees():
    
    print("Request URL: ", request.url)
    
    lunchdinner_menu = LunchDinner.query.filter(LunchDinner.meal_segment.like('Entree'))
    print(lunchdinner_menu)
    return lunches_dinners_schema.jsonify(lunchdinner_menu)

@app.route('/lunch/sides', methods=["GET"])
def getlunchdinnerSides():
    print("Request URL: ", request.url)
    
    lunchdinner_menu = LunchDinner.query.filter(LunchDinner.meal_segment.like('Side'))
    print(lunchdinner_menu)
    return lunches_dinners_schema.jsonify(lunchdinner_menu)

@app.route('/lunch', methods=["GET"])
def getlunch_dinnerMenu():
    lunch_dinner_menu = LunchDinner.query.all()
    return lunches_dinners_schema.jsonify(lunch_dinner_menu)

@app.route('/lunch_item/<id>', methods=["PUT"])
def updatelunch_dinnerItem(id):
    item = LunchDinner.query.get(id)
    name = request.json['name']
    price = request.json['price']
    category = request.json['category']
    mealSegment = request.json['segment']
    item.name = name
    item.price = price
    item.category = category
    item.meal_segment = mealSegment
    
    db.session.commit()
    
    updatedItem = LunchDinner.query.get(item.id)
    return lunch_dinner_schema.jsonify(updatedItem                                    )

@app.route('/lunch_item/<id>', methods=["DELETE"])
def removelunch_dinnerItem(id):
    item = LunchDinner.query.get(id)
    db.session.delete(item)
    db.session.commit()
    
    return lunch_dinner_schema.jsonify(item)
                               
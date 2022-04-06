from database import mallow

class MenuSchema(mallow.Schema):
    class Meta:
        fields = ('name', "price")
        
breakfast_schema = MenuSchema()
lunch_dinner_schema = MenuSchema()

breakfasts_schema = MenuSchema(many=True)
lunches_dinners_schema = MenuSchema(many=True)
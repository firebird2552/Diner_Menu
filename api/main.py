from flask import request
from database import db, app

import BreakfastRoutes as Breakfast
import LunchDinner as LunchDinner

if __name__ == '__main__':
    app.run(debug =True)
    print(f'exit code (0)')
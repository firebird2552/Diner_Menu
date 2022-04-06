from flask import request
from database import db, app

import menu.breakfast as breakfast
import menu.lunch_dinner as lunch_dinner

if __name__ == '__main__':
    app.run(debug =True)
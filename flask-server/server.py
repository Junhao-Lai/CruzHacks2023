from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import PrimaryKeyConstraint
import json, requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgresuper@localhost:4848/allergy_menus'
db = SQLAlchemy(app)


class Allergy(db.Model):
	dish_name = db.Column(db.String(100), nullable=False, primary_key=True)
	allergen = db.Column(db.String(40), nullable=False, primary_key=True)	
	__table_args__ = (PrimaryKeyConstraint('dish_name', 'allergen', name='pk_dishName_allergen'),)

	def __repr__(self) -> str:
		return f"Allergy: {self.description}"
	
	def __init__(self, description) -> None:
		self.description = description



class Menu(db.Model):
	dish_name = db.Column(db.String(100), nullable=False, primary_key=True)
	location = db.Column(db.String(40), nullable=False, primary_key=True)
	date = db.Column(db.String(3), nullable=False, primary_key=True)
	__table_args__ = (PrimaryKeyConstraint('dish_name', 'location', 'date', name='pk_dishName_location_date'),)

	def __repr__(self) -> str:
		return f"Menu: {self.description}"

	def __init__(self, description) -> None:
		self.description = description

# this function is used to get the list of allergy dishes
def get_dish_list(location, date, allergen):
	dish_list = []
	menu_dishes = db.session.query(Menu).filter(Menu.location == location, Menu.date == date).all()
	for menu_dish in menu_dishes:
		allergy_dish = db.session.query(Allergy).filter(Allergy.dishName == menu_dish.dishName, Allergy.allergen == allergen).first()
		if allergy_dish:
			dish_list.append({
				"name": allergy_dish.dishName
			})

	return dish_list
			

# @app.route('/')
# def members():
# 	return {"message" : "yo, this is your allergy reminder","members": ["Michael","Claude","Vincent","Junhao"]}

@app.route('/', methods=['GET'])
def response_allergy_dishes():
	status_code = 500
	request_json = request.get_json()

	try:
		allergen = request_json['allergen']
		location = request_json['location']
		date = request_json['date']

		if len(date) != 3:
			return Response(json.dumps({"Error": "Internal Error"}), status_code)


		dish_list = get_dish_list()
		status_code = 200
		if len(dish_list) == 0:
			return Response(json.dumps({
			"Message": "Seems you would be safe there cuz there is not allergy dishes found!"
			}), status_code)
		

		return Response(json.dumps({
			"Message": "Here are the allergy dishes you need to avoid!",
			"Dish_list": dish_list
		}), status_code)

	except:
		return Response(json.dumps({"Error": "Internal Error"}), status_code)


if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0', port = "4848")

	

from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import PrimaryKeyConstraint, and_
import json, requests
import psycopg2

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgresuper@localhost:5432/allergy_reminder'
db = SQLAlchemy(app)
CORS(app)

conn = psycopg2.connect(
	host="localhost",
	port = "5432",
	database = "allergy_reminder",
	user = "postgres",
	password="postgresuper"
)

conn.set_isolation_level(0)
cursor = conn.cursor()
cursor.execute("SET SCHEMA 'allergy_menu'")
conn.commit()

class Allergens(db.Model):
	__tablename__ = 'allergens'
	dishname = db.Column(db.String(100), nullable=False, primary_key=True)
	allergenname = db.Column(db.String(40), nullable=False, primary_key=True)	
	__table_args__ = (PrimaryKeyConstraint('dishname', 'allergenname', name='pk_dishName_allergen'),)


class Menus(db.Model):
	__tablename__ = 'menus'
	dishname = db.Column(db.String(100), nullable=False, primary_key=True)
	dishlocation = db.Column(db.String(40), nullable=False, primary_key=True)
	dishdate = db.Column(db.String(3), nullable=False, primary_key=True)
	__table_args__ = (PrimaryKeyConstraint('dishname', 'dishlocation', 'dishdate', name='pk_dishName_location_date'),)


# this function is used to get the list of allergy dishes
def get_dish_list(location, date, allergen):
	dish_list = []
	#print("Connecting to the database")
	menu_dishes = db.session.query(Menus).filter(Menus.dishlocation == location, Menus.dishdate == date).all()
	if(menu_dishes == None):
		return dish_list
	# print("Successfully connected to the database")
	# print(menu_dishes)
	# print("Good before for")
	for menu_dish in menu_dishes:
		allergy_dish =Allergens.query.filter(Allergens.dishname == menu_dish.dishname, Allergens.allergenname == allergen).first()
		# fix the name things
		if allergy_dish:
			dish_list.append({
				"name" : allergy_dish.dishname
			})

	return dish_list
			

# @app.route('/')
# def members():
# 	return {"message" : "yo, this is your allergy reminder","members": ["Michael","Claude","Vincent","Junhao"]}

@app.route('/', methods=['GET'])
def response_allergy_dishes():
	status_code = 500
	request_json = request.get_json()
	print(request_json)
	try:
		allergen = request_json['allergen']
		location = request_json['location']
		date = request_json['date']

		if len(date) != 3:
			return Response(json.dumps({"Error": "Internal Error: data"}), status_code)

		#print("Good before getting list")
		dish_list = get_dish_list(location, date, allergen)
		status_code = 200
		if len(dish_list) == 0:
			return Response(json.dumps({
			"Message": "Seems you would be safe there cuz there is no allergy dishes found!"
			}), status_code)
		

		return Response(json.dumps({
			"Message": "Here are the allergy dishes you need to avoid!",
			"Dish_list": dish_list
		}), status_code)

	except (KeyError):
		return Response(json.dumps({"Error": "Internal Error"}), status_code)

if __name__ == "__main__":
	app.run(debug=True, port = "5000")

	

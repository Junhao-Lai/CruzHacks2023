from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
import json, requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgresuper@localhost:4848/allergy_menus'
db = SQLAlchemy(app)

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
			return Response(json.dumps({"Error": "Internal Error: data"}), status_code)


		status_code = 200

		return Response(json.dumps({
			"Message": "This is a response"\
		}), status_code)
	except (KeyError):
		return Response(json.dumps({"Error": "Internal Error: key"}), status_code)


if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0', port = "4848")

	

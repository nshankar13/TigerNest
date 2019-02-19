from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
import hashlib
import json

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://localhost/delivery"


db = SQLAlchemy(app)
ma = Marshmallow(app)

#------------------------------------------------------------------------------------------
class EventOrganizer(db.Model):
	event_organizer_id = db.Column(db.Integer, primary_key = True)
	netid = db.Column(db.Unicode, unique = True)
	name = db.Column(db.Unicode, unique = False)
	email = db.Column(db.Unicode, unique = False)
	campus_organizations = db.Column(db.JSON, unique = False)

	def __init__(self, netid, name, email, campus_organizations):
		self.netid = netid
		self.name = name
		self.email = email
		self.campus_organizations = campus_organizations


class EventOrganizerSchema(ma.Schema):
	class Meta:
		fields = ('event_organizer_id', 'netid', 'name', 'email', 'campus_organizations')

event_organizer_schema = EventOrganizerSchema()
event_organizers_schema = EventOrganizerSchema(many = True)

# Endpoint to add new event organizer
@app.route("/event_organizer", methods=["POST"])
def event_organizer_add():
	netid = request.json['netid']
	name = request.json['name']
	email = request.json['email']
	campus_organizations = request.json['campus_organizations']

	new_event_organizer = EventOrganizer(netid, name, email, campus_organizations)
	db.session.add(new_event_organizer)
	db.session.commit()
	return event_organizer_schema.jsonify(new_event_organizer)

# Endpoint to retrieve existing event organizer from the database
@app.route("/event_organizer/<event_organizer_id>", methods=["GET"])
def event_organizer_get(event_organizer_id):
	event_organizer = EventOrganizer.query.get(event_organizer_id)
	return event_organizer_schema.jsonify(event_organizer)

#------------------------------------------------------------------------------------------
class Event(db.Model):
	event_id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.Unicode, unique = False)
	start_date = db.Column(db.Unicode, unique = False)
	end_date = db.Column(db.Unicode, unique = False)
	location = db.Column(db.Unicode, unique = False)
	time = db.Column(db.Unicode, unique = False)
	expected_number_visitors = db.Column(db.Integer, unique = False)
	number_of_hosts = db.Column(db.Integer, unique = False)
	hosts = db.Column(db.JSON, unique = False)

@app.route("/event", methods=["POST"])
def event_add():
	name = request.json['name']
	start_date = request.json['start_date']
	end_date = request.json['end_date']

#------------------------------------------------------------------------------------------
class Host(db.Model):
	host_id = db.Column(db.Integer, primary_key = True)
	netid = db.Column(db.Unicode, unique = True)
	name = db.Column(db.Unicode, unique = False)
	email = db.Column(db.Unicode, unique = False)
	campus_organizations = db.Column(db.JSON, unique = False)
	hosting_address = db.Column(db.Unicode, unique = False)
	max_visitors = db.Column(db.Integer, unique = False)
	gender = db.Column(db.Unicode, unique = False)
	same_gender = db.Column(db.Boolean, unique = False)
	expandable = db.Column(db.Boolean, unique = False)

#------------------------------------------------------------------------------------------
class Visitor(db.Model):
	visitor_id = db.Column(db.Integer, primary_key = True)
	gender = db.Column(db.Unicode, unique = False)
	name = db.Column(db.Unicode, unique = False)
	same_gender = db.Column(db.Boolean, unique = False)
	university = db.Column(db.Unicode, unique = False)
	email = db.Column(db.Unicode, unique = False)

#------------------------------------------------------------------------------------------
class User(db.Model):
	user_id = db.Column(db.Integer, primary_key = True)
	netid = db.Column(db.Unicode, unique = True)
	name = db.Column(db.Unicode, unique = False)
	email = db.Column(db.Unicode, unique = False)
	birthday = db.Column(db.Unicode, unique = False)
	phone = db.Column(db.Unicode, unique = False)
	address = db.Column(db.Unicode, unique = False)
	allergies = db.Column(db.Unicode, unique = False)
	image = db.Column(db.Unicode, unique = False)


	def __init__(self, netid, name, email, birthday, phone, address, allergies, image):
		self.name = name
		self.email = email
		self.birthday = birthday
		self.phone = phone
		self.address = address
		self.allergies = allergies
		self.netid = netid
		self.image = image

class UserSchema(ma.Schema):
	class Meta:
		fields = ('user_id', 'netid', 'name', 'email', 'birthday', 'phone', 'address', 'allergies', 'image')

user_schema = UserSchema()
users_schema = UserSchema(many = True)

# Endpoint to create new user
@app.route("/user", methods = ["POST"])
def user_add():
	if 'key' not in request.json or request.json['key'] != SECURE_DATABASE_KEY:
		return jsonify({"error": "You don't have admin priveleges to this endpoint."})
	name = request.json['name']
	netid = request.json['netid']
	email = request.json['email']
	birthday = request.json['birthday']
	phone = request.json['phone']
	address = request.json['address']
	allergies = request.json['allergies']
	image = request.json['image']

	new_user = User(netid, name, email, birthday, phone, address, allergies, image)
	db.session.add(new_user)
	db.session.commit()
	return user_schema.jsonify(new_user)

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=os.environ.get("PORT", 5000))
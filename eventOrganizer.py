from flask import Flask, make_response, \
request, jsonify, render_template, redirect, url_for
from flask_mail import Mail,  Message
import requests
import json
import os
from flask_cas import CAS, login_required, login, logout

app = Flask(__name__)

cas = CAS(app, '/cas')
cas.init_app(app)

DATABASE_URL="http://localhost:5000"

app.config['CAS_SERVER'] = 'https://fed.princeton.edu'
app.config['CAS_LOGIN_ROUTE'] = '/cas/login'
app.config['CAS_AFTER_LOGIN'] = 'home'
app.config['CAS_VALIDATE_ROUTE'] = '/cas/serviceValidate'

@app.route("/loginPage")
@app.route("/")
def portal():
    return render_template("login.tpl")

@app.route("/events")
def events_list():
	query_url = DATABASE_URL + "/event/sort_date"
	fetch_req = requests.get(url=query_url)
	json_req = fetch_req.json()
	
	event_name = json_req[0]['name']
	event_start_time = json_req[0]['start_time']
	event_start_date = json_req[0]['start_date']
	event_end_time = json_req[0]['end_time']
	event_end_date = json_req[0]['end_date']
	event_description = json_req[0]['description']
	location = json_req[0]['location']
	expected_number_visitors = json_req[0]['expected_number_visitors']
	number_of_hosts = json_req[0]['number_of_hosts']
	hosts = json_req[0]['hosts']
	hosting_organization = json_req[0]['hosting_organization']

	return render_template("events.tpl", event_name=event_name, event_start_time=event_start_time, event_start_date=event_start_date,\
		                    event_end_date=event_end_date, event_description=event_description, location=location,\
		                    expected_number_visitors=expected_number_visitors, number_of_hosts=number_of_hosts,\
		                    hosts=hosts, hosting_organization=hosting_organization)


if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=os.environ.get("PORT", 8000))

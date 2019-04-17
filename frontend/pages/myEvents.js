import './bootstrap.css';
import React from 'react'

import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import fetch from 'isomorphic-unfetch'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Form, FormText, CustomInput } from 'reactstrap';
import { Card, CardImg, CardText, CardHeader, CardBody, CardTitle, CardSubtitle, CardDeck} from 'reactstrap';
import ReactFileReader from 'react-file-reader';
import EventOrganizerRegister from './eventOrganizerRegister'

import Router from 'next/router'
import Cookies from 'js-cookie';

const database_url = "http://localhost:5000"
const server_url = "http://localhost:3000"

var divStyle = {
  color: 'white'
  //color: 'dodgerblue'
};

var divStyle2 = {
  color: 'black'
  //color: 'dodgerblue'
};

var divStyle3 = {
  //color: 'black'
  color: 'dodgerblue'
};


class eventList extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      modal: false,
      editModal: false,
      deleteModal: false,
      visitorEmails: [],
      event_org_id: -1,
      user_verified: false,
      current_event: { 
        name:"",
        start_time:"",
        end_time:"",
        description:"",
        hosting_organization:"",
        expected_number_visitors:"",
        event_id:""
       }
    };
    this.addOrganizer = this.addOrganizer.bind(this);
    this.toggle = this.toggle.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.editModalToggle = this.editModalToggle.bind(this);
    this.deleteModalToggle = this.deleteModalToggle.bind(this);
    //this.verifyUser = this.verifyUser.bind(this);
  }
  async addOrganizer(){
  //console.log(document.forms["registerForm"]["netid"].value);

    let emailInput = document.forms["registerForm"]["email"].value;
    let passwordInput1 = document.forms["registerForm"]["password1"].value;
    let passwordInput2 = document.forms["registerForm"]["password2"].value;
    let firstnameInput = document.forms["registerForm"]["firstname"].value;
    let lastnameInput = document.forms["registerForm"]["lastname"].value;
    let registrationCode = document.forms["registerForm"]["regcode"].value;
    let netid = Cookies.get('netid');
    
    //
    const res = await fetch("http://localhost:5000/getRegCode", {
        method: "GET",
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        }})

    var data = await res.json();
    data = JSON.stringify(data);

    data = JSON.parse(data);
    let trueRegCode = data['regCode'];

    /*if (passwordInput1 !== passwordInput2)
    {
        this.setState(state => ({ mismatchPassword: true}));
    }*/
    if (registrationCode !== trueRegCode)
    {
      this.setState(state => ({ wrongRegCode: true}));
    }
    else 
    {
       let organizer_info = {
        "firstname": firstnameInput,
        "lastname": lastnameInput,
        "password": passwordInput1,
        "campus_organizations": "", 
        "netid": netid,
        "email": emailInput,
       };
       const res = await fetch('http://localhost:5000/event_organizer', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(organizer_info)
      });
       Router.push("/eventOrganizerLogin");
    }
  }
  async deleteEvent(){
    const res = await fetch(database_url + '/event/delete/' + this.state.current_event.event_id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    });
    this.deleteModalToggle();

  }
  async editEvent(){
    //console.log(this.state.visitorEmails)
    //console.log(document.cookie)
    let eventInfo = {
      "name": document.forms["eventEditForm"]["eventname"].value,
      "start_time": document.forms["eventEditForm"]["starttime"].value,
      "start_date": document.forms["eventEditForm"]["startdate"].value,
      "end_time": document.forms["eventEditForm"]["endtime"].value,
      "end_date": document.forms["eventEditForm"]["enddate"].value,
      "description": document.forms["eventEditForm"]["description"].value,
      "location": document.forms["eventEditForm"]["location"].value,
      "expected_number_visitors": parseInt(document.forms["eventEditForm"]["expectednum"].value),
      "number_of_hosts": 0,
      "hosts": "",
      "hosting_organization": document.forms["eventEditForm"]["hostingorg"].value, 
      "organizer_id": 1
    };

    const res = await fetch(database_url + '/event/update/' + this.state.current_event.event_id, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(eventInfo)
    });

    this.editModalToggle();


  }
  async deleteModalToggle(event){
    if (!this.state.deleteModal)
    {
      let val = event.target.value;
    
      const res = await fetch(database_url + '/event/' + val, {
           method: "GET",
           headers: {
               "Content-Type": "text/plain",                
               "Access-Control-Allow-Origin": "*"
      }})
      var data = await res.json()
      data = JSON.stringify(data)
      data = JSON.parse(data)
      this.setState(state => ({ current_event: data}));
    }

      //console.log(data);

    
    this.setState(prevState => ({
      deleteModal: !prevState.deleteModal
    }));
    
  }
  async editModalToggle(event) {

    this.setState(state => ({ visitorEmails: ""}));
    //this.setState(state => ({ current_event: event.target.value}));
    if (!this.state.editModal)
    {
      let val = event.target.value;
    
      const res = await fetch(database_url + '/event/' + val, {
           method: "GET",
           headers: {
               "Content-Type": "text/plain",                
               "Access-Control-Allow-Origin": "*"
      }})
      var data = await res.json()
      data = JSON.stringify(data)
      data = JSON.parse(data)
      this.setState(state => ({ current_event: data}));
    }

      //console.log(data);

    
    this.setState(prevState => ({
      editModal: !prevState.editModal
    }));
    


  }
  async addEvent(){
    //let name = document.forms["eventCreateForm"]["eventname"].value;
    //console.log(name)
    //console.log(this.state.visitorEmails)
   
    

    //console.log(session_current_organizer);

    /*if (session_eventorg_id != -1)
    {
      this.setState(state => ({ event_org_id: parseInt(session_eventorg_id)}));
    } */

    const res1 = await fetch('http://localhost:5000/event_organizer/netidVerify/' + Cookies.get('netid'), {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            }})
      var data = await res1.json()

    var organizer_id = data['event_organizer_id']

    let eventInfo = {
      "name": document.forms["eventCreateForm"]["eventname"].value,
      "start_time": document.forms["eventCreateForm"]["starttime"].value,
      "start_date": document.forms["eventCreateForm"]["startdate"].value,
      "end_time": document.forms["eventCreateForm"]["endtime"].value,
      "end_date": document.forms["eventCreateForm"]["enddate"].value,
      "description": document.forms["eventCreateForm"]["description"].value,
      "location": document.forms["eventCreateForm"]["location"].value,
      "expected_number_visitors": parseInt(document.forms["eventCreateForm"]["expectednum"].value),
      "number_of_hosts": 0,
      "hosts": "",
      "hosting_organization": document.forms["eventCreateForm"]["hostingorg"].value,
      "organizer_id": organizer_id};

    const res = await fetch(database_url + '/event', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(eventInfo)
    });

    /*const count = await fetch('http://localhost:5000/event/sort_date', {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            }}) */

    this.toggle();
  }
  handleFiles = files => {
    var reader = new FileReader();
    var result = [];
    reader.onload = function(e) {
    // Use reader.result
    result = reader.result.split(",")
    
    alert(result[0])
    }
    this.setState(state => ({ visitorEmails: result}));
  reader.readAsText(files[0]);
}
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    if (!this.state.modal)
      this.setState(state => ({ visitorEmails: ""}));
  }
  async verifyUser(){
    var verified = false;
    var netid = String(Cookies.get('netid'));


    //console.log(netid);

    const session_current_organizer = await fetch(database_url + '/event_organizer/netidVerify/' + netid, {
            method: "GET",
            headers: {
              "Content-Type": "text/plain",
              "Access-Control-Allow-Origin": "*"

    }});

    var resp = await session_current_organizer.json();
    resp = JSON.stringify(resp);

    //console.log(resp);

    if (String(resp) === "{}")
    {
      //verified = true;
      //this.setState(state => ({ user_verified: true}));
      Router.push('/eventOrganizerRegister')

    } 

    //return verified;
    

  } 
  static async getInitialProps(){


    /*var res = await fetch(server_url + '/netid', {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
    }});
    var session_netid = "hello"; */
    //var session_netid = await res.json();
    //console.log(session_netid)
    //var resp = await session_net_id.json()
    //session_net_id = resp['netid']
    //resp = JSON.stringify(resp);
    //console.log(resp);
    var verified = false;
    var netid = String(Cookies.get('netid'));


    console.log(netid);

    const session_current_organizer = await fetch(database_url + '/event_organizer/netidVerify/' + netid, {
            method: "GET",
            headers: {
              "Content-Type": "text/plain",
              "Access-Control-Allow-Origin": "*"

    }});

    var resp = await session_current_organizer.json();
    resp = JSON.stringify(resp);

    console.log(resp);

    if (String(resp) !== "{}")
    {
      verified = true;
      //this.setState(state => ({ user_verified: true}));
    } 

    
    const res2 = await fetch(database_url + '/event/sort_date', {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            }})
    var data = await res2.json()
    data = JSON.stringify(data)

    data = JSON.parse(data)
     //console.log(data)

     let descriptions = []
     let end_dates = []
     let end_times = []
     let expected_number_visitors = []
     let hosting_organizations = []
     let locations = []
     let names = []
     let number_of_hosts = []
     let start_dates = []
     let start_times = []
     let events = []
     let resArray = []

     for (let i = 0; i < data.length; i++)
     {
      events.push(JSON.stringify(data[i]))
     }

     return {
      descriptions: descriptions,
      end_dates: end_dates,
      end_times: end_times,
      expected_number_visitors: expected_number_visitors, 
      hosting_organizations: hosting_organizations, 
      locations: locations, 
      names: names,
      number_of_hosts: number_of_hosts,
      start_dates: start_dates,
      start_times: start_times,
      events:events,
      userVerified: verified
     }

  }
  render(props){

      this.verifyUser(); 
      return(
      <div>
      <Head title="My Events" />

        <Nav />
        
        <div className="hero">
          <center> <h2 style={divStyle}> My Events </h2> </center>
          <Button color="light" onClick={this.toggle}> <a className="text-dark"> Create a new event </a> </Button>
          <br />

      <Modal key="1" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} color="primary"> <p className="text-primary">Create an Event</p></ModalHeader>
          <ModalBody>
          <Form id="eventCreateForm">
          <Row> <Col> Event Name: </Col> <Col> <Input type="text" name="eventname" id="eventname"/> </Col> </Row>
          <br />
          <Row>
          <Col>
          Start Date
          </Col>
          <Col>
          <Input type="text" name="startdate" id="startdate"/>  
          </Col>
          <Col>
          Start Time
          </Col>
          <Col>
          <Input type="text" name="starttime" id="starttime"/>  
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
         End Date 
          </Col>
          <Col>
          <Input type="text" name="enddate" id="enddate"/>
          </Col>
          <Col>
          End Time
          </Col>
          <Col>
          <Input type="text" name="endtime" id="endtime"/>
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Expected Attendance
          </Col>
          <Col>
          <Input type="text" name="expectednum" id="expectednum"/>
          </Col>
          <Col> Location </Col>
          <Col> <Input type="text" name="location" id="location"/> </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Hosting Organization
          </Col>
          <Col>
          <Input type="text" name="hostingorg" id="hostingorg"/>
          </Col>
          </Row>
          <br />
          Please add a brief description of the event: <Input type="textarea" name="description" id="description" /> 
          <br />   
          </Form>  
          <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
              <button id="visitorList" name="visitorList" className='btn'>Upload</button>
          </ReactFileReader>
          
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addEvent}>Create Event</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
      </Modal>

      <Modal key="2" isOpen={this.state.editModal} toggle={this.editModalToggle} className={this.props.className}>
          <ModalHeader toggle={this.editModalToggle}> <p className="text-primary"> Edit your event </p></ModalHeader>
          <ModalBody>
          <Form id="eventEditForm">
          <Row> <Col> Event Name: </Col> <Col> <Input type="text" name="eventname" id="eventname" defaultValue={this.state.current_event.name}/> </Col> </Row>
          <br />
          <Row>
          <Col>
          Start Date
          </Col>
          <Col>
          <Input type="text" name="startdate" id="startdate" defaultValue={this.state.current_event.start_date}/>  
          </Col>
          <Col>
          Start Time
          </Col>
          <Col>
          <Input type="text" name="starttime" id="starttime" defaultValue={this.state.current_event.start_time}/>  
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
         End Date 
          </Col>
          <Col>
          <Input type="text" name="enddate" id="enddate" defaultValue={this.state.current_event.end_date}/>
          </Col>
          <Col>
          End Time
          </Col>
          <Col>
          <Input type="text" name="endtime" id="endtime" defaultValue={this.state.current_event.end_time}/>
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Expected Attendance
          </Col>
          <Col>
          <Input type="text" name="expectednum" id="expectednum" defaultValue={this.state.current_event.expected_number_visitors}/>
          </Col>
          <Col> Location </Col>
          <Col> <Input type="text" name="location" id="location" defaultValue={this.state.current_event.location}/> </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Hosting Organization
          </Col>
          <Col>
          <Input type="text" name="hostingorg" id="hostingorg" defaultValue={this.state.current_event.hosting_organization}/>
          </Col>
          </Row>
          <br />
          Please add a brief description of the event: <Input type="textarea" name="description" id="description" defaultValue={this.state.current_event.description}/> 
          <br />   
          </Form>  
          <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
              <button id="visitorList" name="visitorList" className='btn'>Upload</button>
          </ReactFileReader>
          
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editEvent}>Update Event</Button>{' '}
            <Button color="secondary" onClick={this.editModalToggle}>Cancel</Button>
          </ModalFooter>
      </Modal>

      <Modal key="3" isOpen={this.state.deleteModal} toggle={this.deleteModalToggle} className={this.props.className}>
          <ModalHeader toggle={this.deleteModalToggle}> <p className="text-danger"> Delete {this.state.current_event.name} </p></ModalHeader>
          <ModalBody>
          Are you sure you want to delete this event?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.deleteEvent}>Delete Event</Button>{' '}
            <Button color="secondary" onClick={this.deleteModalToggle}>Cancel</Button>
          </ModalFooter>
      </Modal>
      <br />

      <CardDeck>
        {this.props.events.map((value, index) => {
          let jsonVal = JSON.parse(value)
          return <div key={index}> 
                 <Card className="card bg-dark mb-3" key={index}> 
                  <CardHeader key="0"> <center> <a className="text-light"> {jsonVal['name']} </a> </center> </CardHeader>
                <img width="350" height="170" src="/static/conference.jpg" alt="Card image cap" />
                 {/* <p key="1"> Hosting Organization: {jsonVal['hosting_organization']} </p>
                 <p key="2"> Start Date: {jsonVal['start_date']} </p>
                 <p key="3"> Start Time: {jsonVal['start_time']} </p>
                 <p key="4"> End Date: {jsonVal['end_date']} </p>
                 <p key="5"> End Time: {jsonVal['end_time']} </p>  
                 <p key="6"> Location: {jsonVal['location']} </p>  */}
                 
                <Row> 
                 <Col> <Button color="danger" key="10" size="sm" value={jsonVal['event_id']} onClick={this.deleteModalToggle}> Cancel Event </Button> </Col>
                 <Col> <Button color="primary" key="8" size="sm" value={jsonVal['event_id']} onClick={this.editModalToggle}> Edit Event </Button> </Col>
                 <Col> <Button color="success" key="9" size="sm" value={jsonVal['event_id']}> Begin Matching </Button> </Col> 

                 </Row>

                 </Card> 
                 </div>
  
        })}
        </CardDeck>
    </div>
<style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>

)}}


export default eventList

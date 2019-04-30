import './bootstrap.css';
import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import HostNav from '../components/hostNav'
import fetch from 'isomorphic-unfetch'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Form, FormText, CustomInput } from 'reactstrap';
import { Card, CardImg, CardHeader, CardText, CardBody, CardTitle, CardSubtitle, CardDeck, FormGroup, Label} from 'reactstrap';
import ReactFileReader from 'react-file-reader';
import Cookies from 'js-cookie';

import Router from 'next/router'


var divStyle = {
  color: 'white'
  //color: 'dodgerblue'
};

var divStyle1 = {
  color: 'black'
  //color: 'dodgerblue'
};

const axios = require('axios');

class eventListHost extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      modal: false,
      addHostModal: false,
      visitorEmails: [],
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
    this.addHostToggle = this.addHostToggle.bind(this);
    this.addHost = this.addHost.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
  }
  async editEvent(){
    console.log(this.state.visitorEmails)
    
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
      "organizer_id": 1,};

    const res = await fetch('http://localhost:5000/event/update/' + this.state.current_event.event_id, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(eventInfo)
    });

    this.editModalToggle();


  }
  async addHostToggle(event) {

    this.setState(state => ({ visitorEmails: ""}));
    //this.setState(state => ({ current_event: event.target.value}));
    if (!this.state.addHostModal)
    {
      let val = event.target.value;
    
      const res = await fetch('http://localhost:5000/event/' + val, {
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
      addHostModal: !prevState.addHostModal
    }));
    


  }
  async addHost(){
    //let name = document.forms["eventCreateForm"]["eventname"].value;
    //console.log(name)
    let genderVal = document.forms["hostSignupForm"]["radio1"].value;
    let same_gender = genderVal === "Yes" ? true : false;
    //console.log(this.state.visitorEmails)
    let pairingInfo = {
      "host_first_name": document.forms["hostSignupForm"]["firstname"].value,
      "host_last_name": document.forms["hostSignupForm"]["lastname"].value,
      "host_netid": String(Cookies.get('netid')),
      "host_gender": document.forms["hostSignupForm"]["radio2"].value,
      "same_gender_room": same_gender,
      "host_room_num": document.forms["hostSignupForm"]["roomnum"].value,
      "max_visitors": document.forms["hostSignupForm"]["maxvisitors"].value,
      "visitor_list": {},
      "host_cellphone": document.forms["hostSignupForm"]["cellnum"].value,
      "event_id": this.state.current_event.event_id,
      "event_name": this.state.current_event.name
      };

    const res = await fetch('http://localhost:5000/pairing', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(pairingInfo)
    });


    this.addHostToggle();
    //this.getInitialProps();
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
  static async getInitialProps({req}){

    //const res1 = await fetch('http://localhost:5000/')

    const res1 = await axios({
        url: 'http://localhost:3000/netid',
        // manually copy cookie on server,
        // let browser handle it automatically on client
        headers: req ? {cookie: req.headers.cookie} : undefined,
      });
    const res2 = await fetch('http://localhost:5000/pairing/events_for_host/' + res1.data.netid, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            }})

    var data2 = await res2.json()
      data2 = JSON.stringify(data2)

     data2 = JSON.parse(data2)

     let eventsHost = []

     for(let i = 0; i < data2.length; i++)
     {
      eventsHost.push(data2[i]['event_id'])
     }


    //console.log(res1.data)

     
        const res = await fetch('http://localhost:5000/event/sort_date', {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            }})
      var data = await res.json()
      data = JSON.stringify(data)

     data = JSON.parse(data)
     //console.log(data)

     /* 
        Get all the events that the host is in, put this in a table. 
        Make sure that they do not sign up twice for the same event. 
        Events that they already signed up for should have a "drop event" option.

     */

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

     for (let i = 0; i < data.length; i++)
     {
      if (!eventsHost.includes(data[i]['event_id']) && (data[i]['event_stage'] == 0 || data[i]['event_stage'] == 1))
        events.push(JSON.stringify(data[i]));
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
      data: res1.data
     }

      /*return {
        description: data['description'], 
        end_date: data['end_date'],
        end_time: data['end_time'],
        expected_number_visitors: data['expected_number_visitors'],
        hosting_organization: data['hosting_organization'],
        location: data['location'],
        name: data['name'],
        number_of_hosts: data['number_of_hosts'],
        start_date: data['start_date'],
        start_time: data['start_time']
      } */


  }
  render(props){ 
    //console.log(this.props.data);
    return(
  <div>
  <Head title="Host Events" />
    <HostNav />
    
    <div className="hero">
      <center> <h2 style={divStyle}> Host for an event!</h2> </center>
      <br />

      <Modal key="1" isOpen={this.state.addHostModal} toggle={this.addHostToggle} className={this.props.className}>
          <ModalHeader toggle={this.addHostToggle}> <p className="text-primary"> Host for {this.state.current_event.name} </p> </ModalHeader>
          <ModalBody>
          <Form id="hostSignupForm">
          <Row>
          <Col>
          First Name
          </Col>
          <Col>
          <Input type="text" name="firstname" id="firstname"/>  
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Last Name
          </Col>
          <Col>
          <Input type="text" name="lastname" id="lastname"/>  
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Room Number (Ex: Little Hall 99)
          </Col>
          <Col>
          <Input type="text" name="roomnum" id="roomnum"/>
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Cellphone Number: 
          </Col>
          <Col>
          <Input type="text" name="cellnum" id="cellnum"/>
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Max Number of Visitors: 
          </Col>
          <Col>
          <Input type="text" name="maxvisitors" id="maxvisitors"/>
          </Col>
          </Row>
          <br />
          <Row>
          <Col> Gender </Col>
          <Col> 
          <FormGroup check>
              <Label check>
                <Input type="radio" name="radio2" id="radio2" value="Male"/>{' '}
                Male
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio2" id="radio2" value="Female"/>{' '}
                Female
              </Label>
            </FormGroup>
           </Col>
          </Row>
          <br />
          <Row>
          <Col> Opposite Gender Visitors</Col>
          <Col>
          <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" id="radio1" value="yes"/>{' '}
                Yes
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" id="radio1" value="no"/>{' '}
                No
              </Label>
            </FormGroup>
          </Col>
          </Row>
          <br />
          </Form>  
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addHost}> Sign Up</Button>{' '}
            <Button color="secondary" onClick={this.addHostToggle}>Cancel</Button>
          </ModalFooter>
      </Modal>

    

      <CardDeck>
        {this.props.events.map((value, index) => {
          let jsonVal = JSON.parse(value)
          return <div key={index}> 
          <Card className="card bg-light mb-3" key={index}> 
                  <CardHeader key="0"> <center> <a style={divStyle1}> {jsonVal['name']} </a> </center> </CardHeader>
                <img width="350" height="170" src="/static/conference.jpg" alt="Card image cap" />
                 
                {/*  <p key="1"> Hosting Organization: {jsonVal['hosting_organization']} </p>
                 <p key="2"> Start Date: {jsonVal['start_date']} </p>
                 <p key="3"> Start Time: {jsonVal['start_time']} </p>
                 <p key="4"> End Date: {jsonVal['end_date']} </p>
                 <p key="5"> End Time: {jsonVal['end_time']} </p>  
                 <p key="6"> Location: {jsonVal['location']} </p>    */}
                 <center>  <p key="2"> {jsonVal['start_date']} to {jsonVal['end_date']}  </p> </center>
                 <center>  <p key="3"> {jsonVal['location']}  </p> </center>
                <center> <p key="4">  {jsonVal['start_time']}  </p> </center>        
                 <Button color="primary" key="8" value={jsonVal['event_id']} onClick={this.addHostToggle}> Sign up to host </Button> 
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
        padding: 30px 30px 30px;
        width: 300px;
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

)}
}

export default eventListHost

import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import fetch from 'isomorphic-unfetch'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Form, FormText, CustomInput } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardDeck} from 'reactstrap';
import ReactFileReader from 'react-file-reader';

import Router from 'next/router'

class eventList extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      modal: false,
      editModal: false,
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
    this.toggle = this.toggle.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.editModalToggle = this.editModalToggle.bind(this);
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
  async editModalToggle(event) {

    this.setState(state => ({ visitorEmails: ""}));
    //this.setState(state => ({ current_event: event.target.value}));
    if (!this.state.editModal)
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
      editModal: !prevState.editModal
    }));
    


  }
  async addEvent(){
    //let name = document.forms["eventCreateForm"]["eventname"].value;
    //console.log(name)
    console.log(this.state.visitorEmails)
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
      "organizer_id": 1,};

    const res = await fetch('http://localhost:5000/event', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(eventInfo)
    });

    const count = await fetch('http://localhost:5000/event/sort_date', {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            }})

    this.toggle();
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
  static async getInitialProps(){
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
      /*descriptions.push(data[i]['description']);
      end_dates.push(data[i]['end_dates'])
      end_times.push(data[i]['end_times'])
      expected_number_visitors.push(data[i]['expected_number_visitors'])
      hosting_organizations.push(data[i]['hosting_organizations'])
      locations.push(data[i]['locations'])
      names.push(data[i]['names'])
      number_of_hosts.push(data[i]['number_of_hosts'])
      start_dates.push(data[i]['start_date'])
      start_times.push(data[i]['start_time'])*/
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
      events:events
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
    return(
  <div>
  <Head title="Host Events" />
    <Nav />
    
    <div className="hero">
      <center> <h2> Sign up to host for an event! </h2> </center>
      <br />

      <Modal key="1" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> Create an Event</ModalHeader>
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
          <ModalHeader toggle={this.editModalToggle}> Edit your event</ModalHeader>
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
      <CardDeck>
        {this.props.events.map((value, index) => {
          let jsonVal = JSON.parse(value)
          return <div key={index}> 
                 <Card key={index}> 
                 <p key="0"> Event Name: {jsonVal['name']} </p> 
                 <p key="1"> Hosting Organization: {jsonVal['hosting_organization']} </p>
                 <p key="2"> Start Date: {jsonVal['start_date']} </p>
                 <p key="3"> Start Time: {jsonVal['start_time']} </p>
                 <p key="4"> End Date: {jsonVal['end_date']} </p>
                 <p key="5"> End Time: {jsonVal['end_time']} </p>  
                 <p key="6"> Location: {jsonVal['location']} </p> 
                 
                 <Button key="8" value={jsonVal['event_id']} onClick={this.editModalToggle}> Edit Event </Button> 
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

)}
}

export default eventList

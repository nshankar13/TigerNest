import './bootstrap.css';
import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import HostNav from '../components/hostNav'
import fetch from 'isomorphic-unfetch'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Form, FormText, CustomInput } from 'reactstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardDeck, FormGroup, Label, Table} from 'reactstrap';
import ReactFileReader from 'react-file-reader';
import Cookies from 'js-cookie';

import Router from 'next/router'

//const database_url = "http://localhost:5000"
const database_url = "https://tigernest-backend.herokuapp.com"

var divStyle = {
  color: 'white'
  //color: 'dodgerblue'
};

const axios = require('axios');

class eventListHost extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      modal: false,
      dropEventModal: false,
      addHostModal: false,
      visitorEmails: [],
      current_pairing: -1,
      eventList: [],
      viewDetailsModal: false,
      visitor_list: [],
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
    this.dropEventToggle = this.dropEventToggle.bind(this);
    this.dropEvent = this.dropEvent.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.viewDetailsToggle = this.viewDetailsToggle.bind(this);
  }
  async viewDetailsToggle(){
    if (!this.state.viewDetailsModal)
    {
      let val = event.target.value;
    
      const res = await fetch(database_url + '/visitor_pairing/all_hosts/' + val, {
           method: "GET",
           headers: {
               "Content-Type": "text/plain",                
               "Access-Control-Allow-Origin": "*"
      }})

      var data = await res.json()

      let visitornames = []
      
      for(let i = 0; i < data.length; i++)
      {
        let visitor_id = data[i]['visitor_id']
        let resVisitor = await fetch(database_url + '/visitor/' + visitor_id, {
           method: "GET",
           headers: {
               "Content-Type": "text/plain",                
               "Access-Control-Allow-Origin": "*"
        }})
        var dataVisitor = await resVisitor.json()
        dataVisitor = JSON.stringify(dataVisitor)
        dataVisitor = JSON.parse(dataVisitor)
        visitornames.push(String(data[i]['name']))
      }
  
      //data = JSON.stringify(data);
      //data = JSON.parse(data);
      this.setState(state => ({ visitor_list: visitornames}));
    }

    this.setState(prevState => ({
      viewDetailsModal: !prevState.viewDetailsModal
    }));

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
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(eventInfo)
    });

    this.editModalToggle();


  }
  async dropEventToggle(event) {

    //this.setState(state => ({ visitorEmails: ""}));
    //this.setState(state => ({ current_event: event.target.value}));
    if (!this.state.dropEventModal)
    {
      let val = event.target.value;
    
      const res = await fetch('http://localhost:5000/pairing/' + val, {
           method: "GET",
           headers: {
               "Content-Type": "text/plain",                
               "Access-Control-Allow-Origin": "*"
        }})
      var data = await res.json()
      data = JSON.stringify(data)
      data = JSON.parse(data)
      this.setState(state => ({ current_pairing: data}));
    }

      //console.log(data);

    
    this.setState(prevState => ({
      dropEventModal: !prevState.dropEventModal
    }));
    


  }
  async addHostToggle(event) {

    this.setState(state => ({ visitorEmails: ""}));
    //this.setState(state => ({ current_event: event.target.value}));
    if (!this.state.addHostModal)
    {
      let val = event.target.value;
    
      const res = await fetch('http://localhost:5000/pairing/' + val, {
           method: "GET",
           headers: {
               "Content-Type": "text/plain",                
               "Access-Control-Allow-Origin": "*"
        }})
      var data = await res.json()
      data = JSON.stringify(data)
      data = JSON.parse(data)
      this.setState(state => ({ current_pairing: data}));
    }

      //console.log(data);

    
    this.setState(prevState => ({
      addHostModal: !prevState.addHostModal
    }));
    


  }
  async dropEvent(){

     const res = await fetch('http://localhost:5000/pairing/delete/' + this.state.current_pairing.pairing_id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    });

     this.dropEventToggle();
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
      "host_gender": document.forms["hostSignupForm"]["radio2"].value,
      "same_gender_room": same_gender,
      "host_room_num": document.forms["hostSignupForm"]["roomnum"].value,
      "max_visitors": document.forms["hostSignupForm"]["maxvisitors"].value,
      "host_cellphone": document.forms["hostSignupForm"]["cellnum"].value,
      "event_id": this.state.current_event.event_id
      };

    const res = await fetch('http://localhost:5000/pairing/update/' + this.state.current_pairing.pairing_id, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(pairingInfo)
    });


    this.addHostToggle();
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
  async filterEvents()
  {
    var netid = String(Cookies.get('netid'));

    const res = await fetch('http://localhost:5000/pairing/events_for_host/' + netid, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            }})
      var data = await res.json()
      data = JSON.stringify(data)

     data = JSON.parse(data)

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

     //console.log(events)

     this.setState({
        eventList: events
      });
  }
  static async getInitialProps({req}){
        //const netid = Cookies.get('netid')
        /*const res = await fetch('http://localhost:5000/pairing/events_for_host/' + netid, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            }})
      var data = await res.json()
      data = JSON.stringify(data)

     data = JSON.parse(data) */
     //console.log(data)

     const res1 = await axios({
        url: 'http://localhost:3000/netid',
        // manually copy cookie on server,
        // let browser handle it automatically on client
        headers: req ? {cookie: req.headers.cookie} : undefined,
      });

     const res = await fetch('http://localhost:5000/pairing/events_for_host/' + res1.data.netid, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*"
            }})
      var data = await res.json()
      data = JSON.stringify(data)

     data = JSON.parse(data)

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
     
     for(let i = 0; i < data.length; i++)
     {
      events.push(data[i]);
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
      events: events
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

    /*this.setState({
        eventList: this.filterEvents()
      }); */
      //this.filterEvents();
    return(
  <div>
  <Head title="Host Events" />
    <HostNav />
    
    <div className="hero">
      <center> <h2 style={divStyle}> Your Events</h2> </center>
      <br />


      <Modal key="1" isOpen={this.state.addHostModal} toggle={this.addHostToggle} className={this.props.className}>
          <ModalHeader toggle={this.addHostToggle}> <p className="text-primary"> Edit Information for {this.state.current_pairing.event_name} </p> </ModalHeader>
          <ModalBody>
          <Form id="hostSignupForm">
          <Row>
          <Col>
          First Name
          </Col>
          <Col>
          <Input type="text" name="firstname" id="firstname" defaultValue={this.state.current_pairing.host_first_name}/ >  
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Last Name
          </Col>
          <Col>
          <Input type="text" name="lastname" id="lastname" defaultValue={this.state.current_pairing.host_last_name}/>  
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Room Number 
          </Col>
          <Col>
          <Input type="text" name="roomnum" id="roomnum" defaultValue={this.state.current_pairing.host_room_num}/>
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Cellphone Number: 
          </Col>
          <Col>
          <Input type="text" name="cellnum" id="cellnum" defaultValue={this.state.current_pairing.host_cellphone}/>
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Max Number of Visitors: 
          </Col>
          <Col>
          <Input type="text" name="maxvisitors" id="maxvisitors" defaultValue={this.state.current_pairing.max_visitors}/>
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
            <Button color="primary" onClick={this.addHost}> Update Info </Button>{' '}
            <Button color="secondary" onClick={this.addHostToggle}>Cancel</Button>
          </ModalFooter>
      </Modal>

       <Modal key="2" isOpen={this.state.dropEventModal} toggle={this.dropEventToggle} className={this.props.className}>
          <ModalHeader toggle={this.dropEventToggle}> <p className="text-danger"> Drop {this.state.current_pairing.event_name} </p> </ModalHeader>
          <ModalBody>

          Are you sure you want to drop out of this event?

          </ModalBody>

          <ModalFooter>
            <Button color="danger" onClick={this.dropEvent}> Drop Event</Button>{' '}
            <Button color="secondary" onClick={this.dropEventToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

         <Modal key="6" isOpen={this.state.viewDetailsModal} toggle={this.viewDetailsToggle} className={this.props.className}>
          <ModalHeader toggle={this.viewDetailsToggle}> <p className="text-success"> View Your Visitor List! </p></ModalHeader>
          <ModalBody>
         {this.state.visitor_list}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.viewDetailsToggle}>Exit</Button>
          </ModalFooter>
      </Modal>

     
         <Table dark>
         <tbody>
         
         {this.props.events.map((value, index) => {
          //console.log("value" + value);
          let jsonVal = value;
          //let jsonVal = value;
          let tableHead = "";
          if (index == 0)
          {
            tableHead = "<thead> <tr> <th> Name </th> <th> your gender </th>"
          }
          return <div>
                 <tr key={index}>
                 <th key="0"> Event Name: {jsonVal['event_name']} </th> 
                 <th key="1"> Your gender: {jsonVal['host_gender']} </th>
                 <th key="2"> Same Gender Room: {(jsonVal['same_gender_room'])} </th>
                 <th key="3"> Maximum Visitors: {jsonVal['max_visitors']} </th>
                 <th key="4"> First Name: {jsonVal['host_first_name']} </th>
                 <th key="5"> Last Name: {jsonVal['host_last_name']} </th>  
                 <th key="6"> Cellphone: {jsonVal['host_cellphone']} </th>    
                 <br />         
                  <th> <Button color="light" key="8" value={jsonVal['pairing_id']} onClick={this.addHostToggle} size="sm" > Edit Information </Button> </th>
                 <th> <Button color="danger" key="9" value={jsonVal['pairing_id']} onClick={this.dropEventToggle} size="sm"> Drop Event </Button> </th>
                 <th> <Button color="success" key="9" value={jsonVal['pairing_id']} onClick={this.viewDetailsToggle} size="sm"> View Visitors </Button> </th>
                 
                 </tr> 
                 </div>
                 
  
        })} 
         </tbody>
         </Table> 
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

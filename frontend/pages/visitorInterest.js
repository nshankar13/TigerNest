import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import { Button, Container, Row, Col, CustomInput, Form, FormFeedback, FormGroup, FormControl, Label, Input, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import PropTypes from 'prop-types'
import Cookies from 'js-cookie';
import './bootstrap.css';


const database_url = "http://localhost:5000"

var divStyle = {
  //color: 'slate grey'
  //color: 'dodgerblue'
  color: 'white'
};

class VisitorInterestForm extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      mismatchPassword: false,
      wrongRegCode: false,
      dropdownOpen: false,
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
  
    this.addOrganizer = this.addOrganizer.bind(this)
    this.setSelectedEvent = this.setSelectedEvent.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }
  async setSelectedEvent(event)
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
  async addOrganizer(){
  //console.log(document.forms["registerForm"]["netid"].value);

    let emailInput = document.forms["registerForm"]["email"].value;
    //let passwordInput1 = document.forms["registerForm"]["password1"].value;
    //let passwordInput2 = document.forms["registerForm"]["password2"].value;
    let firstnameInput = document.forms["registerForm"]["firstname"].value;
    let lastnameInput = document.forms["registerForm"]["lastname"].value;
    //let university = document.forms["registerForm"]["university"].value;
    let event_name = document.forms["registerForm"]["eventname"].value;

    const res = await fetch('http://localhost:5000/visitor/' + emailInput, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(organizer_info)
      });

    // add eligibility
    // add visitor

    // add email to visitor-add method
    //let registrationCode = document.forms["registerForm"]["regcode"].value;
    //let netid = document.forms["registerForm"]["netid"].value;
    //let netid = Cookies.get('netid');

    // need to add to eligibilities and
    //
    /*const res = await fetch("http://localhost:5000/getRegCode", {
        method: "GET",
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        }})

    var data = await res.json();
    data = JSON.stringify(data);

    data = JSON.parse(data);
    let trueRegCode = data['regCode'];*/

    /*if (passwordInput1 !== passwordInput2)
    {
        this.setState(state => ({ mismatchPassword: true}));
    }*/
    
       let organizer_info = {
        "firstname": firstnameInput,
        "lastname": lastnameInput,
        //"password": passwordInput1,
        "password": "abc",
        "campus_organizations": "", 
        "netid": netid,
        "email": emailInput,
       };
       /*const res = await fetch('http://localhost:5000/event_organizer', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(organizer_info)
      });
       Router.push("/myEvents");*/

    }
    toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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
     let events = [];

     for(let i = 0; i < data.length; i++)
     {
      events.push(data[i]);
     }

     return {
      events:events
     }
  }
  
  render(props){
    return (
  <div>
  <Head title="Event Signup" />
    <Nav />
    <div className="hero">

      <div className="center">

      <center> <h2 style={divStyle}> Event Interest Form </h2> </center>
      <br />
      <center> <p style={divStyle}> Fill out the following information to sign up for an event! </p> </center>
      <br />

       <Form id="registerForm">
       <center>
          <Row>
          <Col>
          <p style={divStyle}> First Name </p>
          </Col>
          <Col>
          <Input type="text" name="firstname" id="firstname"/>  
          </Col>
          </Row>
          <Row>
          <Col>
          <p style={divStyle}> Last Name  </p>
          </Col>
          <Col>
          <Input type="text" name="lastname" id="lastname"/>  
          </Col>
          </Row>
          <br />
          <Row>
          <Col> 
          <p style={divStyle}> Which event will you be participating in? </p>
          </Col>
          <Col> 
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle caret>
              {this.state.current_event.name === "" ? <div> Select One </div> : <div> {this.state.current_event.name} </div>}
            </DropdownToggle>
            <DropdownMenu>
              {this.props.events.map((value, index) => {
                let jsonVal = value;
                return <DropdownItem key={index} value={jsonVal['event_id']} onClick={this.setSelectedEvent}> {jsonVal['name']} </DropdownItem>
              })}
            </DropdownMenu>
          </Dropdown>
          {/*<Input type="select" id="eventname" name="eventname">
              <option value="0">Select one</option>
              {this.props.events.map((value, index) => {
                let jsonVal = value;
                return <Button key=index value={jsonVal['event_id']} onClick={this.setSelectedEvent}> {jsonVal['name']} </Button>
              })}

          </Input> */}
          </Col>
          </Row>
          <Row>
          <Col>
          <p style={divStyle}> Email Address </p>
          </Col>
          <Col>
          <Input type="text" name="email" id="email"/>  
          </Col>
          </Row>
        
          <br />
          <center> <Button color="dark" onClick={this.addOrganizer}> Submit </Button> </center> </center>
          <br />
          {this.state.mismatchPassword ? <center> <p>Passwords do not match!</p> </center>: null}
          {this.state.wrongRegCode ? <center> <p>Wrong registration code! Please contact Niranjan Shankar (nshankar@princeton.edu) or Michelle Yuen (mjyeun@princeton.edu) for the correct registration code.</p> </center>: null}

        </Form>
        <br />
      </div>

    </div>
  </div>)

}
}


export default VisitorInterestForm

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

class VisitorConfirmation extends React.Component {
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
    //let event_name = document.forms["registerForm"]["eventname"].value;

    /*const res = await fetch('http://localhost:5000/visitor/' + emailInput, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(organizer_info)
      });
    */
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
        "visitor_email": emailInput,
        "event_id": String(this.state.current_event.event_id),
        "event_name": String(this.state.current_event.name)
       };
       const res = await fetch('http://localhost:5000/eligibility', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(organizer_info)
      });
       //Router.push("/myEvents");

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
    <div className="hero">
      <link href="https://fonts.googleapis.com/css?family=Maven+Pro" rel="stylesheet" />


      <div className="center">

      <center> <h2 style={divStyle}> Signup Confirmation </h2> </center>
      <br />
      <center> <p style={divStyle}> </p> </center>
      <br />

       <center>

       <p style={divStyle}> Thank you for signing up for an event! We look forward to having you back on our platform to sign up for rooms. </p>

       </center>
          
        <br />
      </div>

    </div>
    <style jsx>{`
      :global(body) {
        margin: 0;
        //background: url("/static/candyBackground.jpg");
        background: url("/static/background.jpg");
        //backbround-color: #FFFFFF;
        //background-color: #1A9788;
        background-size: cover;

        font-family: 'Maven Pro', sans-serif;
      }
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
  </div>)

}
}


export default VisitorConfirmation

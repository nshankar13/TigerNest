import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import fetch from 'isomorphic-unfetch'
import { Button, Container, Row, Col, CustomInput, Form, FormFeedback, FormGroup, Label, Input, FormText} from 'reactstrap';
import PropTypes from 'prop-types'

class eventRegister extends React.Component {
  constructor(props, context){
    super(props, context);
    this.addUser = this.addUser.bind(this);
  }
  async addUser(){
  //console.log(document.forms["registerForm"]["netid"].value);

  let userInfo = {
    "name": document.forms["registerForm"]["name"].value, 
    "netid": document.forms["registerForm"]["netid"].value,
    "email": document.forms["registerForm"]["email"].value, 
    "campus_organizations": document.forms["registerForm"]["campusorg"].value,
    "hosting_address": document.forms["registerForm"]["address"].value,
    "max_visitors": parseInt(document.forms["registerForm"]["maxvisitor"].value),
    "gender": document.forms["registerForm"]["gender"].value, 
    "same_gender": true,
    "expandable": true,
    "additional_visitors": 1,
  };

  console.log(JSON.stringify(userInfo));

  const res = await fetch('http://localhost:5000/host', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(userInfo)
  });

  

  const content = await res.json();
  console.log(content);
}
  render(){
    return (
  <div>
  <Head title="Event Registration Form" />
    <Nav />
    
    <div className="hero">
      <center> Sign up to host for an event!</center>

      <form id="registerForm">
      <div className="row">
      <div className="column">
      Name: 
      </div> 
      <div className="column"> 
      <input type="text" name="name" />  
      </div>
      </div>


     <div className="row">
     <div className="column">
      Net ID: 
      </div>

      <div className="column">
      <input type="text" name="netid" id="netid" />
      </div>  
      </div>

       <div className="row">
       <div className="column">
      Email: 
      </div>

      <div className="column">
      <input type="text" name="email" id="email" /> 
      </div>
      </div>

      <div className="row">
      <div className="column">
      Campus Organization: 
      </div>
      <div className="column">
      <input type="text" name="campusorg" id="campusorg" />
      </div>
      </div>
      <div className="row">
      <div className="column">
      Hosting Address: 
      </div>

      <div className="column">
      <input type="text" name="address" id="address" />
      </div>
      </div>

      <div className="row">
      <div className="column">
      Max Visitors: 
      </div>

      <div className="column">
      <input type="text" name="maxvisitor" id="maxvisitor" />
      </div>
      </div>
      <div className="row">
      Gender: <input type="text" name="gender" id="gender" />
      </div>

       <center><button onClick={this.addUser}> Submit information </button> </center>
      </form>

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
        margin: 20px auto 20px;
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


export default eventRegister

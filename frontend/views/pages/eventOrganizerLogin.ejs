import React from 'react'
import Link from 'next/link'
import Head from '.../components/head'
import Nav from '.../components/nav'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import { Button, Container, Row, Col, CustomInput, Form, FormFeedback, FormGroup, FormControl, Label, Input, FormText} from 'reactstrap';
import PropTypes from 'prop-types'



class eventOrganizerLogin extends React.Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      showMessage: false,
    };
  
    this.verifyCredentials = this.verifyCredentials.bind(this)
  }
  async verifyCredentials(){
  //console.log(document.forms["registerForm"]["netid"].value);

    let emailInput = document.forms["registerForm"]["email"].value;
    let passwordInput = document.forms["registerForm"]["password"].value;
    let finalUrl = 'http://localhost:5000/event_organizer/email/' + emailInput;
 
    const res = await fetch(finalUrl, {
        method: "GET",
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        }})
    var data = await res.json()
    data = JSON.stringify(data)

    data = JSON.parse(data)
    //console.log(data)

    if (passwordInput === data['password'])
    {
        Router.push("/eventList");
    }
    else
    {
      this.setState(state => ({ showMessage: true}));
    } 
  }
  render(props){
    return (
  <div>
  <Head title="Event Organizer Login" />
    <Nav />
    <div className="hero">

      <div className="center">

      <center> <h2> Event Organizer Login </h2> </center>
      <br />
      <center> Sign into your account, or click register to create a new one! </center>
      <br />



        <Form id="registerForm">
          <Row>
          <Col>
          Email 
          </Col>
          <Col>
          <Input type="text" name="email" id="email"/>  
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
         Password 
          </Col>
          <Col>
          <Input type="password" name="password" id="password"/>
          </Col>
          </Row>
          <br />
          <center> <Button onClick={this.verifyCredentials}> Sign in </Button> </center>
          <br />
          {this.state.showMessage ? <center> <p>Incorrect Password, please try again!</p> </center>: null}

        </Form>
        <br />
        <center> Don't have an account? Register with us <Link href="/eventOrganizerRegister"><a>here.</a></Link></center>
      </div>

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
      .center {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }
    `}</style>
  </div>)

}
}


export default eventOrganizerLogin

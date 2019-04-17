import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import { Button, Container, Row, Col, CustomInput, Form, FormFeedback, FormGroup, FormControl, Label, Input, FormText} from 'reactstrap';
import PropTypes from 'prop-types'


const RegisterPage = () => (


<div>
  <Head title="Event Organizer Registration" />
    <Nav />
    <div className="hero">

      <div className="center">

      <center> <h2> Event Organizer Registration </h2> </center>
      <br />
      <center> Enter in the following information to create your account! </center>
      <br />

       <Form id="registerForm">
          <Row>
          <Col>
          First Name 
          </Col>
          <Col>
          <Input type="text" name="firstname" id="firstname"/>  
          </Col>
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
          Email 
          </Col>
          <Col>
          <Input type="text" name="email" id="email"/>  
          </Col>
          <Col>
         Password 
          </Col>
          <Col>
          <Input type="password" name="password1" id="password1"/>
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          Re-Enter Password
          </Col>
          <Col>
          <Input type="password" name="password2" id="password2"/>
          </Col>
          <Col>
          Registration Code
          </Col>
          <Col>
          <Input type="password" name="regcode" id="regcode"/>
          </Col>
          </Row>
          <br />
          <Row>
          <Col>
          NetID: 
          </Col>
          <Col>
          <Input type="text" name="netid" id="netid"/>
          </Col>
          <Col>

          </Col>
          <Col>

          </Col>
          </Row>
          <br />
          <center> <Button onClick={this.addOrganizer}> Sign Up </Button> </center>
          <br />
          {this.state.mismatchPassword ? <center> <p>Passwords do not match!</p> </center>: null}
          {this.state.wrongRegCode ? <center> <p>Wrong registration code! Please contact Niranjan Shankar (nshankar@princeton.edu) or Michelle Yuen (mjyeun@princeton.edu) for the correct registration code.</p> </center>: null}

        </Form>
        <br />
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
  </div>


)



export default RegisterPage
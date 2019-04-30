

/*import React from 'react'

import Link from 'next/link'
import Head from '../components/head'
//import NavBar from '../components/navBar'
//import Nav from '../components/nav'

/*function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById('root'));

import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Nav from '../components/nav';
import ReactDOM from 'react-dom';
//var document = typeof document === 'undefined' ? '' : document;


if (typeof window !== 'undefined') {
  ReactDOM.render((<Nav />), document.getElementById('root'));
} */
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.css';
import './bootstrap.css';
import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import Nav from '../components/nav';
import { GoogleLogin } from 'react-google-login';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { BrowserRouter as Router} from 'react-router-dom'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardDeck, Row} from 'reactstrap';

const responseGoogle = (response) => {
  console.log(response);
}

var divStyle = {
  color: 'white'
  //color: 'dodgerblue'
};

var divStyle2 = {
  //color: 'white'
  color: 'dodgerblue'
};

var divStyle3 = {
  color: 'black'
}




const Home = () => (
  <div>

    <Head title="Home" />
    <link href="https://fonts.googleapis.com/css?family=Maven+Pro" rel="stylesheet" />
 
 
    <div className="hero">
      <h1 className="title" style={divStyle}>WELCOME TO <br /> TIGERNEST!</h1>
      <p className="description" style={divStyle}>
      <br />
        Matching Princeton students with visiting guests
      </p>
      <br />
      <center style={divStyle}> I am a.... </center>
      <div className="row">

      {/* <Card className="text-white" color="dark">
        <h5> Event Organizer </h5>
        <p> Register events that <br /> and visitors sign up for!</p>
          <center> <Link href="/myEvents">
            <a className="button">
              Login
            </a>
          </Link> </center>
          <center> <Link href="/eventOrganizerRegister">
            <a className="button">
              Sign up
            </a>
          </Link> </center>

      </Card> */}

      <Link href="/myEvents">
          <a className="card">
            <h3 style={divStyle3}> Event Organizer</h3>
            <p style={divStyle3}> Register events that hosts and visitors sign up for!</p>
          </a>
      </Link> 
      <Link href="/hostAllEvents">
          <a className="card">
            <h3 style={divStyle3}>Host 🛏️</h3>
            <p style={divStyle3}>Host a visiting student!</p>
          </a>
      </Link>
        <Link href="https://open.segment.com/create-next-app">
          <a className="card">
            <h3 style={divStyle3}>Visitor 💼</h3>
            <p style={divStyle3}>
              Find a place to stay!
              </p>
              <GoogleLogin
                clientId="183998616948-ulm4tmpji0ssvns40u5bs4gsvu1ubeff.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />  
          </a>
        </Link>

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
  </div>
)

export default Home 
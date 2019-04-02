

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

const Home = () => (
  <div>
    <Head title="Home" />
 

    <div className="hero">
      <h1 className="title">Welcome to TigerNest!</h1>
      <p className="description">
        Matching Princeton students with visiting students.
      </p>
      <br />
      <center> I am a.... </center>
      <div className="row">

      <Card>
        <h5> Event Organizer </h5>
        <p> Register events that <br /> and visitors sign up for!</p>
          <center> <Link href="/eventList">
            <a className="button">
              Login
            </a>
          </Link> </center>
          <center> <Link href="/eventOrganizerRegister">
            <a className="button">
              Sign up
            </a>
          </Link> </center>

      </Card>

      {/* <Link href="/eventOrganizerLogin">
          <a className="card">
            <h3>Event Organizer</h3>
            <p> Register events that hosts and visitors sign up for!</p>
          </a>
      </Link> */}
      <Link href="/hostLogin">
          <a className="card">
            <h3>Hosts 🛏️</h3>
            <p>Host a visiting student!</p>
          </a>
      </Link>
        <Link href="https://open.segment.com/create-next-app">
          <a className="card">
            <h3>Visitors 💼</h3>
            <p>
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
        background: url("/static/background.jpg");
        background-size: cover;

        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
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
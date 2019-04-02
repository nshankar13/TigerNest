

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

const Homepage = () => (
  <div>
    <Head title="Home" />
    <Nav />
 

    <div className="hero">
    <br />
    <br />
    <center> TigerNest is a web application that matches Princeton hosts with incoming visitors for overnight events. Here are some guidelines for navigating our site as an event organizer. </center>  

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

export default Homepage


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
  </div>
)

export default Homepage
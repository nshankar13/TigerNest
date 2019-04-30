import React from 'react'
import Link from 'next/link'
import { Navbar } from 'reactstrap';



//import EventList from './eventList'

//import { renderToString } from 'react-dom/server';
//import StaticRouter from 'react-router-dom/StaticRouter';
//import EventList from '../components/eventList'
//import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
//import createBrowserHistory from 'history/createBrowserHistory'

/*const links = [
  { href: 'https://github.com/segmentio/create-next-app', label: 'Github' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
}) */

var divStyle = {
  color: 'seagreen'
}

const NavBar = () => (
  //const history = createMemoryHistory();

  <Navbar color="light" light expand="md">
  <link href="https://fonts.googleapis.com/css?family=Maven+Pro" rel="stylesheet" />
    <ul>
      <li>
        <Link href="/home">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/myEvents">
          <a>My Events</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>My Account</a>
        </Link>
      </li>
      <li>
        <Link href="/logout">
          <a>Logout</a>
        </Link>
      </li>
    </ul>
    <style jsx>{`
      :global(body) {
        margin: 0;
        //background: url("/static/candyBackground.jpg");
        background: url("/static/background.jpg");
        //background-color: #FFFFFF;
        background-size: cover;

        font-family: font-family: 'Maven Pro', sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
        margin-top: 0;
        margin-bottom: 0;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </Navbar>

)
/*
export default Nav 

import React from 'react'
import Header from './header'
import Main from './main'

const Nav = () => (
  <div>
  <Header />
  <Main />
  </div>
)*/

export default NavBar

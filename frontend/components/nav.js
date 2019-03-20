import React from 'react'
import Link from 'next/link'
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


const Nav = () => (
  //const history = createMemoryHistory();

  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/eventList">
          <a>Events</a>
        </Link>
      </li>
      <li>
        <Link href="/eventRegister">
          <a>Register to be a Host</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About</a>
        </Link>
      </li>
    </ul>
    <style jsx>{`
      :global(body) {
        margin: 0;
        background-color: #ffb833;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
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
  </nav>

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

export default Nav

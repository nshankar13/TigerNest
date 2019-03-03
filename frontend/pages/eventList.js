import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import fetch from 'isomorphic-unfetch'


const eventList =  (props) => (
  <div>
  <Head title="Events List" />
    <Nav />
    
    <div className="hero">
      <center> Welcome to the events listing page! </center>

      Event Name: {props.name} {'\n'}
      
      Event Description: {props.description} {'\n'}
      
      Start Date: {props.start_date} {'\n'}
      
      Start Time: {props.start_time} 

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

eventList.getInitialProps = async function() {
  const res = await fetch('http://localhost:5000/event/1', {
        method: "GET",
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
        }})
  var data = await res.json()
  data = JSON.stringify(data)

 data = JSON.parse(data)


  return {
    description: data['description'], 
    end_date: data['end_date'],
    end_time: data['end_time'],
    expected_number_visitors: data['expected_number_visitors'],
    hosting_organization: data['hosting_organization'],
    location: data['location'],
    name: data['name'],
    number_of_hosts: data['number_of_hosts'],
    start_date: data['start_date'],
    start_time: data['start_time']
  }
}

export default eventList

<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8">
    <title>Flask React</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- styles -->
  </head>
  <body>
    <div class="container">
      <h1>Flask React</h1>
      <br>
      <div id="content"></div>
    </div>
    <!-- scripts -->
    Event Name: {{event_name}} <br>
    Event Start Date: {{event_start_date}} <br>
    Event End Date: {{event_end_date}} <br>
    Event Start Time: {{event_start_time}} <br>
    Event End Time: {{event_end_time}} <br>
    Event Description: {{event_description}} <br>
    Event Location: {{event_location}} <br>
    Expected Number of Attendees: {{expected_number_visitors}} <br>
    Number of Hosts: {{number_of_hosts}} <br>
    Hosts: {{hosts}} <br>
    Hosting Organization: {{hosting_organization}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
    <script type="text/jsx">

      /*** @jsx React.DOM */

      var realPython = React.createClass({
        render: function() {
          return (<h2>Greetings, from Real Python!</h2>);
        }
      });

      ReactDOM.render(
        React.createElement(realPython, null),
        document.getElementById('content')
      );

    </script>
  </body>
</html>
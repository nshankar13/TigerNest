const express = require('express');
const next = require('next');
let session = require('cookie-session')
    
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
var CentralAuthenticationService = require('cas');


app.prepare()
    .then(() => {
        const server = express();
        var casURL = 'https://fed.princeton.edu/cas/'
        var cas = new CentralAuthenticationService({
          base_url: casURL,
          service: "http://localhost:3000"
        })
        server.use(session({
          secret: 'abcdefghijklmnop',
          maxAge: 24 * 60 * 60 * 1000 * 365 // 365 days
        }))
                    
        /*server.get('*', (req, res) => {
            return handle(req, res);
        });*/
        /*server.get('/', (req, res) => {
            res.render('views/pages/index.js')
        });*/
        /*server.get('/', function (req, res) {
          // Check whether the user sending this request is authenticated
          if ((typeof (req.session.cas) === 'undefined')) {
            // The user in unauthenticated. Display a splash page.
            res.render('/pages/eventOrganizerLogin', res.locals.renderLocals)
          } else {
            // The user has authenticated. Display the app
            res.render('/pages/eventList', res.locals.renderLocals)
          }
        })*/
        server.get('/login', function (req, res) {
          // Save the user's redirection destination to a cookie
          if (typeof (req.query.redirect) === 'string') {
                req.session.redirect = req.query.redirect
              }

          // Redirect the user to the CAS server
          res.redirect(casURL + 'login?service=' + "http://localhost:3000/verify")

        })
        server.get('/logout', function (req, res) {

          req.session = null
          res.redirect(casURL + 'logout?url=http://localhost:3000')

        })
        /*server.get('/eventOrganizer/*', function (req, res) {
          // Save the user's redirection destination to a cookie
          if (req.session.cas) {
            return handle(req, res);
          }
          // Redirect the user to the CAS server
          res.redirect("/login?redirect=/eventOrganizer/*")
        }) */

        /*server.get('/eventList', function (req, res) {
          // Save the user's redirection destination to a cookie
          if (req.session.cas) {
            //console.log("hello there")

            return handle(req, res);
          }
          // Redirect the user to the CAS server
          res.redirect("/login?redirect=/eventList")
        })
        server.get('/myEvents', function (req, res) {
          // Save the user's redirection destination to a cookie
          if (req.session.cas) {
            return handle(req, res);
          }
          res.redirect("/login?redirect=/myEvents")
        }) */
        server.get('/verify', function(req, res) {
          // Check if the user has a redirection destination
          let redirectDestination = req.session.redirect || '/'

          // If the user already has a valid CAS session then send them to their destination
          if (req.session.cas) {
            /*let netidTemp = req.session.cas.netid + "";
            async function netidVerify(){
                const res = await fetch('http://localhost:5000/event_organizer/netidVerify/' + netidTemp, {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain",
                    "Access-Control-Allow-Origin": "*"
                }})
                var data = await res.json()
                data = JSON.stringify(data)
                return data
            }
            data = netidVerify()
            if (data !== "") */
            res.redirect(redirectDestination)
            return
          }

          var ticket = req.query.ticket

          // If the user does not have a ticket then send them to the homepage
          if (typeof (ticket) === 'undefined') {
            res.redirect('/')
            return
          }

          // Check if the user's ticket is valid
          cas.validate(ticket, function (err, status, netid) {
            if (err) {
              console.log(err)
              res.sendStatus(500)
              return
            }

            // Save the user's session data
            req.session.cas = JSON.stringify({
                  error: err,
                  status: status,
                  netid: netid,
                  ticket: ticket,
                  session: req.session
                }); 

            //req.session.netid = String(cas.s)
            //req.session.status = String(status)
            res.redirect(redirectDestination)
        })
         }) 
            /*
            async function netidVerify2(){
                const res = await fetch('http://localhost:5000/event_organizer/netidVerify/' + netid, {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain",
                    "Access-Control-Allow-Origin": "*"
                }})
                var data = await res.json()
                data = JSON.stringify(data)
                return data
            }
            data = netidVerify2()
            if (data !== "")
            { 
                req.session.cas = {
                  status: status,
                  netid: netid
                }
                res.redirect(redirectDestination) 
            } 
          }) 
        })*/

        server.get('/netid', function (req, res) {
          // Save the user's redirection destination to a cookie
          if (req.session.cas) {
            //console.log("hello there")
            //let netidResult = JSON.stringify({netid: req.session.cas['netid']});

            return res.json(req.session.cas)
          }
          // Redirect the user to the CAS server
          res.redirect("/login?redirect=/eventList")
        })        
        server.get('/', function (req, res) {
            return handle(req, res);
        })
        server.get('/static/background.img', 
            function (req, res) {
                return handle(req, res);
            }
        )
        server.get('*', function (req, res) {
            if (req.session.cas){
                return handle(req, res);
            }
            res.redirect("/login?redirect=/eventList")            
        }) 
        /*server.get('/static/background.img', 
            function (req, res) {
                return handle(req, res);
            }
        )*/
        /*server.get('/static/background.jpg', 
            function (req, res) {
                return handle(req, res);
            }
        )*/


        /*server.get('/_next/static/development/*',
            function (req, res) {
                return handle(req, res);
            }
        )*/
        /*server.get('*', 
            function (req, res) {
                return handle(req, res);
            }
        ) */
        /*server.get('*', (req, res) => {
                server.get('/eventList', function (req, res) {
              // Save the user's redirection destination to a cookie
              if (req.session.cas) {
                return handle(req, res);
              }
              // Redirect the user to the CAS server
              res.redirect("/login?redirect=/eventList")
            })
            //return handle(req, res);
        })*/
        server.set('views', '/views');
        server.set('view engine', 'js');
        server.engine('js', require('express-react-views').createEngine()); 

            
        server.listen(3000, (err) => {
            if (err) {
                throw err;
            }
            console.log('> Ready on http://localhost:3000');
        });

    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
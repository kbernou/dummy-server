"use strict"
const express = require("express"),
      app = express(),
      fs = require("fs"),
      port = process.env.PORT || 3535;
      
app.route("/200/*")
    .get((req, res) => {
        console.log(`200 GET to ${req.url}`)
        res.send("OK").status(200)
    })
    .post((req, res) => {
        console.log(`200 POST to ${req.url}`)
        res.send("OK").status(200)
    });

app.route("/400/*")
    .get((req, res) => {
        console.log(`400 GET to ${req.url}`)
        res.send("400 You made a mistake").status(400)
    })
    .post((req, res) => {
        console.log(`400 POST to ${req.url}`)
        res.send("400 You made a mistake").status(400)
    });

app.route("/500/*")
    .get((req, res) => {
        console.log(`500 GET to ${req.url}`)
        res.send("500 I made a mistake").status(500)
    })
    .post((req, res) => {
        console.log(`500 POST to ${req.url}`)
        res.send("500 I made a mistake").status(500)
    });

app.route("/*")
    .get((req, res) => {
        let datetime = new Date()
        fs.appendFile('requests.log', `[${datetime}] 200 GET to ${req.url}\n`, err => {
           if (err) console.error("Shat the bed writing to file: " + err) 
        });
        res.send("OK").status(200)
    })
    .post((req, res) => {
        let datetime = new Date()
        fs.appendFile('requests.log', `[${datetime}]200 GET to ${req.url}\n`, err => {
           if (err) console.error("Shat the bed writing to file: " + err) 
        });
        res.send("OK").status(200)
    });

app.listen(port, () => {
    console.info(`Started on ${port}`);
})

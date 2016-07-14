#!/usr/local/bin/node 

'use strict';

var express = require('express');
var fs = require('fs');

var app = express();

app.todos = [];
app.use(express.static('www'));

app.start = function () {
    fs.writeFile('./todo' , "[]" , 'utf-8');
};

app.start();

app.get('/' , function (req , res) {
    let final ="";
    let indexHtml = fs.readFile('./www/index.html' , function (err , data) {
        data.on('data' , function (data) {

           final += data.toString();
        });
        data.on('end' , function () {
            res.send(final);
        });
        if(err)
            console.error(err);

    });
});

app.get('/addtodo', function (req , res) {

    if (req.query["text"] && req.query["checked"]) {
        app.todos.push({
            text: req.query["text"],
            checked: req.query["checked"]
        });

        let write = fs.createWriteStream( './todo' , 'utf-8' );
            write.write( JSON.stringify( app.todos ) );

        res.sendStatus(200);
    }
 else {
    res.sendStatus(500);
    }

});

app.get('/fetchtodos', function (req, res) {
    let read = fs.createReadStream('./todo', 'utf-8');
    let final = "";
    read.on('data' , function ( data) {
        final += data;
    });

    read.on('end', function () {
        app.todos = JSON.parse(final);
        res.send(app.todos);
    });

});

app.get('/cleartodos' , function (req , res) {


    let write = fs.createWriteStream('./todo', 'utf-8');
    if(req.query["data"])
        write.write(JSON.stringify(req.query["data"]))
    else
        write.write("[]");
    res.sendStatus(200);
})

app.listen(8080);
console.log('app started');


//const raspi = require('raspi');
//const gpio = require('raspi-gpio');

//raspi.init(() => {
  //const input = new gpio.DigitalInput('P1-3');
  //const output = new gpio.DigitalOutput('P1-7');
  //output.write(1);
//});

/***************** ServerController **************/
var ServerController = (()=>{
  
    const raspi = require('raspi');
    const gpio = require('raspi-gpio');
    var output;

    var express = require('express');
    var app = express();
    app.use(express.static('./public'));

    var socket = require("socket.io");

    var server = app.listen(9000, ()=>{
        console.log('server started on port 9000')

    });


    raspi.init(() => {
        output = new gpio.DigitalOutput('P1-7');
        //output.write(1);
    });

    //Socket setup
    var io = socket(server);

    io.on('connection', (socket)=>{
        console.log('new connection', socket.id);
        //Receive values from the client
        socket.on('onoffButton', (data)=>{
            console.log(data.value);
            output.write(Number(data.value));

        });
    });


})();
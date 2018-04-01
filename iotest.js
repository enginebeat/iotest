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

    var server = app.listen(9000,'0.0.0.0', ()=>{
        console.log('server started on port 9000')

    });

    //var os = require( 'os' );

    //var networkInterfaces = os.networkInterfaces( );

    //console.log( networkInterfaces );


    raspi.init(() => {
        output11 = new gpio.DigitalOutput('P1-11');
        output7 = new gpio.DigitalOutput('P1-7');

        //Socket setup
        var io = socket(server);

        io.on('connection', (socket)=>{
            console.log('new connection', socket.id);
            //Receive values from the client
            socket.on('onButton', (data)=>{
                var pinNumber;
                console.log(data);
                if(data.pinNum === '7'){
                    console.log('in 7');
                    output7.write(1);
                }else if(data.pinNum === '11'){
                    console.log('in 11');
                    output11.write(1);
                };
                

            });
            socket.on('offButton', (data)=>{
                var pinNumber;
                console.log(data);
                if(data.pinNum === '7'){
                    output7.write(0);
                }else if(data.pinNum === '11'){
                    output11.write(0);
                };
                
            })
        });
    });

    

})();
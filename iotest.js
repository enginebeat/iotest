console.log('app started');

/***************** ServerController **************/
var ServerController = (()=>{
  
    const raspi = require('raspi');
    const gpio = require('raspi-gpio');
    
    const express = require('express');
    var app = express();
    
    app.use(express.static('./public'));

    const socket = require("socket.io");

    const server = app.listen(9000,'0.0.0.0', ()=>{
        console.log('server started on port 9000');
        //to make sure the the server is listening 
        //before socket is created 
        initSocket();

    });

    //var os = require( 'os' );

    //var networkInterfaces = os.networkInterfaces( );

    //console.log( networkInterfaces );
    
    function initSocket(){

        raspi.init(() => {
            
            output11 = new gpio.DigitalOutput('P1-11');
            output7 = new gpio.DigitalOutput('P1-7');
        });

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
                
            });
        });
    
    };

    

})();
console.log('app started');

/***************** ServerController **************/
var ServerController = (()=>{
  
    const raspi = require('raspi');
    const gpio = require('raspi-gpio');
    
    const express = require('express');
    var app = express();
    
    app.use(express.static('./public'));

    const socket = require("socket.io");
    const serverIPAddress = '0.0.0.0';
    const serverPort = 9000;

    const server = app.listen(serverPort,serverIPAddress, ()=>{
        console.log(`server started on port ${serverPort}`);
        //to make sure the the server is listening 
        //before socket is created 
        initSocket();

    });

    //var os = require( 'os' );

    //var networkInterfaces = os.networkInterfaces( );

    


    function initSocket(){

        raspi.init(() => {
            
            output11 = new gpio.DigitalOutput('P1-11');
            output7 = new gpio.DigitalOutput('P1-7');
        });



        //Socket setup
        var io = socket(server);
        
        //console.log( networkInterfaces );
        function sendCommand(socket, command){
            io.to(socket.id).emit('command', {command: command});
            //socket(id).emit('command', {command: command});
        };

        io.on('connection', (socket)=>{
            console.log(`new connection on Port 9000, ID: ${socket.id}`);
            var socketID = socket.id;
            //Receive values from the client
            socket.on('onButton', (data)=>{
                var pinNumber;
                console.log(`On signal sent from Socket ID: ${socket.id}`);
                //console.log(data);
                if(data.pinNum === '7'){
                    output7.write(1);
                }else if(data.pinNum === '11'){
                    output11.write(1);
                }; 
                sendCommand(socket, 'On'); 
            });
            socket.on('offButton', (data)=>{
                var pinNumber;
                console.log(`Off signal sent from Socket ID: ${socket.id}`);
                //console.log(data);
                if(data.pinNum === '7'){
                    output7.write(0);
                }else if(data.pinNum === '11'){
                    output11.write(0);
                };
                sendCommand(socket, 'Off')
            });
        });
    
    };

    

})();
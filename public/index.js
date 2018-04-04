//Make connection

//get the server IP Address for this socket
var serverIPAddress = location.hostname;
var serverPort = location.port
console.log(serverIPAddress);
console.log(serverPort);
var socket = io.connect('http://' + serverIPAddress + ':' + serverPort);




var onButton = document.getElementById('on_Btn');
var offButton = document.getElementById('off_Btn');
var pinNum = document.getElementById('pin_num');
var command = document.getElementById('command_label');

onButton.addEventListener('click', ()=>{
    pinValue = pinNum.value;
    socket.emit('onButton', {pinNum: pinValue});
});

offButton.addEventListener('click', ()=>{
    pinValue = pinNum.value;
    socket.emit('offButton', {pinNum: pinValue});
});

socket.on('command', (data)=>{
    command.innerHTML = data.command;
});
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

onButton.addEventListener('click', ()=>{
    pinValue = pinNum.value;
    socket.emit('onButton', {pinNum: pinValue});
});

offButton.addEventListener('click', ()=>{
    pinValue = pinNum.value;
    socket.emit('offButton', {pinNum: pinValue});
});
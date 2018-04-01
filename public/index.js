//Make connection
var socket = io.connect('http://192.168.0.51:9000');



var toggleBtn = document.getElementById('toggle_Btn');
console.log(toggleBtn);
toggleBtn.addEventListener('click', ()=>{
    var state = 0;
    console.log(toggleBtn.value);
    switch(toggleBtn.value){
        case 'On':
            state = 1;
            console.log('turning on');
            toggleBtn.value = 'Off';
            break;
        case 'Off':
            state = 0;
            console.log('turning off');
            toggleBtn.value = 'On'
            break;
    };
    
    //if(toggleBtn.value === 'On'){
        
    //} else{
        
    //};
    socket.emit('onoffButton', {value: state});
});
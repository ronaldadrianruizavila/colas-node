var socket = io();
var labelTicket = $("#lblNuevoTicket");
socket.on('connect', () => {
    console.log('conectado al servidor')
});
socket.on('disconnnect', () => {
    console.log('Desconectado del servidor')
});

$('button').on('click',()=>{
   
    socket.emit('siguiente-ticket',null,(siguienteTicket)=>{
        labelTicket.text(siguienteTicket);
    })
})

socket.on('estado-actual',({estadoActual})=>{
    labelTicket.text(estadoActual);
})


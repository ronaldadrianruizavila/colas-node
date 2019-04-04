var socket = io();

var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
var lblTicket4 = $("#lblTicket4");

var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
var lblEscritorio4 = $("#lblEscritorio4");

var lblTickets = [
    lblTicket1, 
    lblTicket2, 
    lblTicket3, 
    lblTicket4
];
var lblEscritorios = [
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4
];


socket.on("estado-actual", data => {
    render(data.ultimos4);
});

socket.on('ultimos-cuatro',(data)=>{
    var audio = new Audio('./audio/new-ticket.mp3');
    audio.preload = false;
    window.open();
    console.log(audio);
    audio.play().then(console.log).catch(console.log);
    render(data.ultimos4);
})

let render = (ultimos4)=>{
    ultimos4.forEach((ticket,index) => {
        lblTickets[index].text('Ticket: '+ticket.numero);
        lblEscritorios[index].text('Escritorio: '+ticket.escritorio);
    });
}
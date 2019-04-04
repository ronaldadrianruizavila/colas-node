const fs = require('fs-extra')
const { Ticket } = require('../models/index');

class TicketController {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];
        let data = require('../data/data.json')
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo,null)
        this.tickets.push(ticket);
        this.grabarArchivo()
        return `Ticket ${this.ultimo}`
    }

    get ultimoTicket(){
        return `Ticket ${this.ultimo}`
    }
    get ultimoCuatros(){
        return this.ultimosCuatro
    }
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = []
        this.grabarArchivo()
    }

    async grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro,
        }
        let jsonDataString = JSON.stringify(jsonData);

        await fs.writeFile('./src/data/data.json', jsonDataString);
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0 ){
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;

        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket,escritorio);
        this.ultimosCuatro.unshift(atenderTicket);

        if(this.ultimosCuatro.length>4){
            this.ultimosCuatro.splice(-1,1);
        }

        this.grabarArchivo();

        return atenderTicket;
    }

    get ticketAtendido(){
        return this.ultimosCuatro[0];
    }

}

module.exports = TicketController;
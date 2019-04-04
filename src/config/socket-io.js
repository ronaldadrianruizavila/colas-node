const { TicketController } = require("../controllers");

const ticketControl = new TicketController();
module.exports = socket => {
    socket.on("connection", client => {
        let estadoActual = ticketControl.ultimoTicket;
        let ultimoticket = ticketControl.ticketAtendido;
        let ultimos4 = ticketControl.ultimosCuatro;
        console.log("usuario conectado");

        client.on("siguiente-ticket", (data, callback) => {
            let siguiente = ticketControl.siguiente();
            console.log(siguiente);

            callback(siguiente);
        });

        client.emit("estado-actual", {
            estadoActual,
            ultimos4
        });

        client.on("atender-ticket", (data, callback) => {
            if (!data.escritorio) {
                return callback({
                    err: true,
                    mensaje: "El escriorio es necesario"
                });
            }

            let atenderTicket = ticketControl.atenderTicket(data.escritorio);
            callback(atenderTicket);

            client.broadcast.emit("ultimos-cuatro", {
                estadoActual,
                ultimos4
            });
        });

    });
};

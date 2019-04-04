var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (
    !searchParams.has("escritorio") ||
    !Number(searchParams.get("escritorio"))
) {
    window.location = "index.html";
    throw new Error("El escritorio es necesario");
}

var escritorio = searchParams.get("escritorio");
var label = $("small");
console.log(escritorio);

$("h1").text("Escritorio: " + escritorio);

$("button").on("click", () => {
    socket.emit("atender-ticket", { escritorio }, ticket => {
        if (ticket === "No hay tickets") return;
        label.text("Ticket:" + ticket.numero);
    });
});


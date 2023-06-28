"use strict";

//window.addEventListener('load', onLoad);

let box = null;

function mouseMove(e) {

    if (box == null) {
        box = document.querySelector('.box');
    }

    if (box == null || box == undefined) {
        return;
    }

    const { clientX, clientY } = e;

    box.style.top = `${clientY}px`;
    box.style.left = `${clientX}px`;
    box.style.backgroundColor = `rgb(${(clientX + clientY) % 255},${clientX % 255},${clientY % 255})`;

    const jsonPosition = JSON.stringify({
        top: `${clientY}px`,
        left: `${clientX}px`,
        backgroundColor: box.style.backgroundColor
    });

    connection.invoke("SendPosition", jsonPosition).catch(function (err) {
        return console.error(err.toString());
    });
}

var connection = new signalR.HubConnectionBuilder().withUrl("/gamehub").build();

connection.on("ReceivePosition", function (json) {
    console.log(json);

    const position = JSON.parse(json);

    box.style.top = position.top;
    box.style.left = position.left;
    box.style.backgroundColor = position.backgroundColor;
});

connection.start().then(function () {

    console.log('loaded!');

    document.body.addEventListener('mousemove', mouseMove);


}).catch(function (err) {
    return console.error(err.toString());
});
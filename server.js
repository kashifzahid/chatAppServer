const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    
})
io.on('connection', function (socket) {
    console.log("one user connected" + socket.id);
    socket.on('join', function (data) {
        socket.join(data.user);
        // We are using room of socket io
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    
    socket.on('message', function (data) {
        console.log(data.message);
        io.sockets.in(data.user).emit("new_msg", { message: data });
        console.log("message sent to" + data.user);
        
       // io.emit("message", { message: data });
        
    })
    
})



http.listen(PORT, function () {
    console.log("Listening on port "+PORT);
})
console.log('The value of PORT is:', process.env.PORT);

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
    
    socket.on('message', function (data) {
        console.log(data);
        io.emit("message", { message: data });
        
    })
    
})



http.listen(PORT, function () {
    console.log("Listening on port "+PORT);
})
console.log('The value of PORT is:', process.env.PORT);

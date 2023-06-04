const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { spawn } = require('child_process');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected');

    const pythonProcess = spawn('python', ['synonyms.py']);

    // Handle Python process output
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python output: ${data}`);
        socket.emit('response', data);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

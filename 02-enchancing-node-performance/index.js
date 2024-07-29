process.env.UV_THREADPOOL_SIZE = 5;
const cluster = require('node:cluster');

// Is the file being executed in master mode?
if(cluster.isMaster){
    // Cause index.js to be executed *again* but
    // in child mode
    cluster.fork();
    // cluster.fork();
    // cluster.fork();
    // cluster.fork();
}else{
    // Child mode, going to act like a server
    const express = require('express');
    const crypto = require('node:crypto')
    const app = express();
    
    app.get('/',(req,res) => {
        crypto.pbkdf2('a', 'b', 100000,512,'sha512', () => {
            res.send('Hi there!');
        });
    });
    
    app.get('/fast', (req,res) =>{
        res.send('This was fast!');
    })

    app.listen(3033);
}


// process.env.UV_THREADPOOL_SIZE = 1;
const https = require('node:https');
const crypto = require('node:crypto');
const fs = require('node:fs');

const start = Date.now();

function doRequest(){
    https.request('https://www.google.com', res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log('Request: ', Date.now() - start);
        }); 
    }).end();
}

function doHash(){
    crypto.pbkdf2('a', 'b', 100000,512,'sha512', () => {
        console.log('Hash: ',Date.now() - start);
    });
}

doRequest();

fs.readFile('multitask.js', 'utf-8', () => {
    console.log('FS: ',Date.now()-start);
});

doHash();
doHash();
doHash();
doHash();
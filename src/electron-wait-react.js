const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.MODE = "dev";

console.info(`Wait script connecting to port: ${port}`)

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('starting electron');
            startedElectron = true;
            const exec = require('child_process').exec;
            exec('npm run app');
        }
    }
);

tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});

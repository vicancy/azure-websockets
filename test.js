const settings = require('./settings.json').ConnectionString;
const Manager = require('./azure-websockets');//(settings);

var client = new Manager(settings);
client.broadcast("hello")
    .then(() => {
        console.log("succeed");
    })
    .catch(err => {
        console.log(err);
    });
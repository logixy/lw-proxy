var proxy = require("node-tcp-proxy");
const axios = require('axios');

async function loadServerList() {
    let srvList = new Array;
    await axios.get("https://logicworld.ru/monAJAX/ajax.php").then(res => {
        let data = res.data.servers
        let sortData = Object.values(data);
        for (let i = 0; i < sortData.length; i++) {
            tmpAdr = sortData[i].address.split(":");
            srvList.push({
                address: tmpAdr[0],
                port: tmpAdr[1]
            })
        }
    })
    // console.log(srvList);
    return srvList;
}

function startProxy() {
    // proxy.createProxy(3939, "s2.logicworld.ru", 3939)
    loadServerList().then(data => {
        for (let i = 0; i < data.length; i++) {
            proxy.createProxy(data[i].port, data[i].address, data[i].port);
            console.log(`Proxy for ${data[i].address}:${data[i].port} started`);
        }
        proxy.createProxy(9274, "s2.logicworld.ru", 9274); //LServer
        console.log("Proxy for launc-server started");
        proxy.createProxy(9692, "play.logicworld.ru", 9692); //Skins/Cloaks
        console.log("Proxy for skins and cloaks started");
        proxy.createProxy(9692, "play.logicworld.ru", 8000); //RRRRRRRRADIO!
        console.log("Proxy for RRRRRRRRADIO started");
        console.log(`Successfuly started`);
    }).catch(err => {
        console.log(err);
    })
}

startProxy()

process.on('SIGINT', function () {
    console.log("Stopping proxy");
    process.exit();
});

var proxy = require("node-tcp-proxy");
const axios = require('axios');

const domain = "logixy.net"

const proxyList = []

async function loadServerList() {
    let srvList = new Array;
    await axios.get(`https://${domain}/monAJAX/ajax.php`).then(res => {
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
    return srvList;
}

function startProxy() {
    loadServerList().then(data => {
        for (let i = 0; i < data.length; i++) {
            proxyList.push(proxy.createProxy(data[i].port, data[i].address, data[i].port)) ;
            console.log(`Proxy for ${data[i].address}:${data[i].port} started`);
        }
        proxyList.push(proxy.createProxy(9274, `s2.${domain}`, 9274)) ; //LServer
        console.log("Proxy for launc-server started");
        proxyList.push(proxy.createProxy(9692, `play.${domain}`, 9692)); //Skins/Cloaks
        console.log("Proxy for skins and cloaks started");
        proxyList.push(proxy.createProxy(8000, `play.${domain}`, 8000)); //RRRRRRRRADIO!
        console.log("Proxy for RRRRRRRRADIO started");
        console.log(`Successfuly started`);
    }).catch(err => {
        console.log(err);
    })
}

startProxy()

process.on('SIGINT', function () {
    console.log("Stopping proxy");
    for (let i = 0; i < proxyList.length; i++) {
        proxyList[i].end()
    }
    process.exit();
});

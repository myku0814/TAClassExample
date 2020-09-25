let currentDevice = "";

// 所有btn加上點擊事件監聽，點擊觸發ble function
$(".button").click(ble);

function ble(e) {
    console.log(`${e.target.innerHTML} 被點擊`);
    
    switch(e.target.innerHTML) {
        case "Scan":       // 搜尋裝置
            scan();
            break;
        case "Connect":    // 連線
            connect(currentDevice);
            break;
        case "Stop":       // 斷線
            stop(currentDevice);
            break;
        default:
            console.log("oops...");
    }

}

function scan() {
    navigator.bluetooth.requestDevice({
        // filters: [{
        //     name: blablabla
        // }],
        optionalServices: ['00001523-1212-efde-1523-785feabcd123'],
        acceptAllDevices: true
    })
    .then(device => {
        console.log(`選了 ${device.name}`);
        currentDevice = device;
        console.log(currentDevice);
        console.log(currentDevice.uuids);
    })
    .catch(err => { console.log(err); });

}

function connect(dev) {
    dev.gatt.connect()
            .then(server => {
                console.log(server);
                return server.getPrimaryService('00001523-1212-efde-1523-785feabcd123');
            })
            .then(service => {
                console.log(service);
                return service.getCharacteristic('713d0002-503e-4c75-ba94-3148f18d941e');
            }) 
            .then(chara => {
                console.log(chara);
                chara.startNotifications().then(c => {
                    c.addEventListener('characteristicvaluechanged', function(e){
                        // if(!lock){
                            console.log(this.value.buffer);
                            // algorithm(Array.from(new Uint8Array(this.value.buffer)));
                        // }

                        // 在網頁上印出data
                        document.getElementById('data').innerHTML = "[" + Array.from(new Uint8Array(this.value.buffer))+ "]";

                    });
                })
            })
            .catch(error => { console.log(error); });
}

function stop(dev) {
    dev.gatt.disconnect();
    console.log(`${dev.name} 已斷線`);
}
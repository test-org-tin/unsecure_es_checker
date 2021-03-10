const net = require("net");

var client = new net.Socket();
client.connect({
  port: 9243,
  host: "https://f86b46ca9ec644159818fc222690cdc7.us-central1.gcp.cloud.es.io",
});

client.on("connect", function () {
  console.log("Client: connection established with server");

  console.log("---------client details -----------------");
  var address = client.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log("Client is listening at port" + port);
  console.log("Client ip :" + ipaddr);
  console.log("Client is IP4/IP6 : " + family);
  client.write(JSON.stringify({test : "test"}))

  console.log(address)
  console.log(client)

});

client.setEncoding("utf8");

client.on("data", function (data) {
  console.log("Data from server:" + data);
});



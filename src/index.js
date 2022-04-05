require('dotenv').config();
const http = require("http");
const fs = require("fs");
var requests = require("requests");


const homeFile = fs.readFileSync("../home.html", "utf-8");


const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
  temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
  temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
  //  "http://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=b14425a6554d189a2d7dc18a8e7263",

"http://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=d57c13b3ce8577f9844ba84e18c805f4",
)
      .once("data", (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
        const temp=arrData[0].main.temp;
        const temp_min=arrData[0].main.temp_min;
        const temp_max=arrData[0].main.temp_max;
        //console.log(tempinC);
        //console.log(arrData[0].main.temp);
        const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join("");
        res.write(realTimeData);
        // console.log(realTimeData);
      })
      .once("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });
    //  res.end();

      //res.end("Request Processed Successfully");
  }
  else {
    res.end("File not found");
  }
});

server.listen(8000, "127.0.0.1");

//console.log("kfjklsfklgf");
//https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=b14425a6554d189a2d7dc18a8e7263

//http://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=b14425a6554d189a2d7dc18a8e7263

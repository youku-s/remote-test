const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
   const endpoint = req.url;
   if( endpoint==='/start' ){
      fs.readFile('./index.html',(err, data)=>{
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.write(data);
         res.end();
      });
   }
   if( endpoint==='/api' ){
      // ここに処理を記述してください。   
      let received = "";
      req.on("data", chunk => {
         received += chunk;
      });
      req.on("end", () => {
         let results = [];
         const data = JSON.parse(received);
         for (let i = 1; i <= 30; i ++) {
            let filteredData = data.obj.filter(x => i % x.num == 0);
            if (filteredData.length == 0) {
               results.push(i.toString());
            } else {
               results.push(filteredData.map(x => x.text).join(" "));
            }
         }
         res.writeHead(200, {'Content-Type': 'application/json'});
         res.write(JSON.stringify({"data" : results.join(",") }));
         res.end();
      })
   }
});
server.listen(8080); 
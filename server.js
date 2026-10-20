const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const PORT = Number(process.env.PORT || 3000);
const APP_VERSION = process.env.APP_VERSION || "1";
const htmlPath = path.join(__dirname, "index.html");

const server = http.createServer((req, res) => {
  if (req.url === "/api/health") {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({success: true, app: "Campus Event Board", version: APP_VERSION}));
  } else if (req.url === "/" || req.url === "/index.html") {
    let html = fs.readFileSync(htmlPath, "utf8").replaceAll("__APP_VERSION__", APP_VERSION);
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.end(html);
  } else {
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({success: false, message: "Not found"}));
  }
});
server.listen(PORT, "0.0.0.0", () => console.log(`Campus Event Board v${APP_VERSION} listening on ${PORT}`));

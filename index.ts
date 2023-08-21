import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import actuator from "express-actuator";
import expressWs from "express-ws";
import ws from "ws";

dotenv.config();
const port = process.env.PORT ?? 3030;

const app = expressWs(express()).app;
app.use(actuator());

const connections = {};

app.ws("/ws/:from/:to", (ws: ws, req: express.Request) => {
  const {from, to} = req.params;
  connections[from] = ws;
  ws.on('message', function(msg) {
    if (!connections[to]) {
      console.log("No connection for " + to);
      return;
    }
    connections[to].send(msg);
  });
});


app.listen(port, () => {
  console.log("Express server started on port: " + port);
});

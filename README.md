# WS-BRIDGE
Minimal express server to bridge two websocockets.

## Docker
Start the container on port `3030`: 

```
docker run -p 3030 ghcr.io/giubots/ws-bridge:master
```

## Usage
Create two socket connections (`from` and `to` can be anything), for example with [WebSocket Client](https://livepersoninc.github.io/ws-test-page/):
```
first:  ws://localhost:3030/ws/from/to
second: ws://localhost:3030/ws/to/from
```
Sending a message to the first socket will deliver it to the second. Sending to second will deliver to first.

Sending a message to first if second is not connected drops the message.

Health check available curtesy of [express-actuator](https://github.com/rcruzper/express-actuator).
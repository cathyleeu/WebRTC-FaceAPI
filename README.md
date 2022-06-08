# WebRTC & Face API
Toy project using webrtc and face api.js

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
## openssl
before running this project, 
- setup openssl 
- create .cert folder 
- and run below code on terminal

```
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout .cert/localhost.key -out .cert/localhost.crt
```

## TODO 

- ### Setup 
  - [x]  Socket Io
  - [x]  Socket Context 
  - [ ]  create WebRTC Hooks
  - [ ]  clean up PeerConnection Events
  - [ ]  Media & WebRTC API



# hapi-graylog-pro

## Introduction
This plugin help HAPI sends logs to Graylog server. 

## Installation
- Using npm
```shell script
npm install --save hapi-graylog-pro
```
- Using yarn
```shell script
yarn add hapi-graylog-pro
```

## Usage

### Register the plugin with Hapi

```javascript
server.register(require('hapi-graylog-pro'), (err) => {
  if(err) console.log(err)
  //...
})
```
or
```javascript
server.register([
    {
        plugin: require('hapi-graylog-pro'),
        options: {
            // see more in options
        }
    }
])
```

### Configuration
- Simple
```javascript
{
  adapterOptions: {
    host: 'my.glog-server.net', // optional; default: 127.0.0.1
    port: 12201                 // optional; default: 12201
  }
}
```

- Advanced
```javascript
{
  fields: {facility: "example", owner: "Tom (a cat)"}, // optional; default fields for all messages
  filter: [],                                          // optional; filters to discard a message
  transform: [],                                       // optional; transformers for a message
  broadcast: [],                                       // optional; listeners of a message
  levels: {},                                          // optional; default: see the levels section below
  aliases: {},                                         // optional; default: see the aliases section below
  adapterName: 'udp',                                  // optional; currently supported "udp", "tcp" and "tcp-tls"; default: udp
  adapterOptions: {                                    // this object is passed to the adapter.connect() method
    // common
    host: '127.0.0.1',                                 // optional; default: 127.0.0.1
    port: 12201,                                       // optional; default: 12201
    // ... and so on
    // tcp adapter example
    family: 4,                                         // tcp only; optional; version of IP stack; default: 4
    timeout: 1000,                                     // tcp only; optional; default: 10000 (10 sec)
    // udp adapter example
    protocol: 'udp4',                                  // udp only; optional; udp adapter: udp4, udp6; default: udp4
    // tcp-tls adapter example
    key: fs.readFileSync('client-key.pem'),            // tcp-tls only; optional; only if using the client certificate authentication
    cert: fs.readFileSync('client-cert.pem'),          // tcp-tls only; optional; only if using the client certificate authentication
    ca: [fs.readFileSync('server-cert.pem')]           // tcp-tls only; optional; only for the self-signed certificate
  }
}
```

#### Levels
- Default: `{emergency: 0, alert: 1, critical: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7}`
- Example: `log.emergency(...)`, `log.critical(...)`, etc.
- Custom example: `{alert: 0, notice: 1, ...}`

#### Aliases
- Default: `{log: 'debug', warn: 'warning'}`
- Example: `log.log(...) -> log.debug(...), log.warn(...) -> log.warning(...), etc.`
` Custom example: `{red: 'alert', yellow: 'notice', ...}`

### To send logs
- Server log
```javascript
server.log(['info'], `Server was starting at port ${PORT}`);
``` 
- Request log
```javascript
request.log(['error'], { foo: 'bar' })
```

## Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.


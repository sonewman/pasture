# Pasture

A few helper methods for parsing http headers from a tcp stream.

This is by no means complete, but hopefully will be someday soon.

### Installation
```
npm i pasture
```

### Usage

#### pasture.scan(chunk, lookingFor)
```javascript
// scan a buffer for a matching buffer or array of charCodes
pasture.scan(new Buffer('abcdefghijk'), new Buffer('ghi'));
// => 6

pasture.scan([97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107], [103, 104, 105]);
// => 6
```

#### pasture.getHeaderEndingIndex(buffer)
```javascript
// get a the start index of the end of the HTTP header.
// this is particularly useful for slicing a buffer to obtain
// just the header
const req = new Buffer('GET /abc HTTP/1.1\r\nHost: 0.0.0.0:3000\r\nContent-Length: 0\r\n\r\n');
const i = pasture.getHeaderEndingIndex(req);
// => 56
const header = req.slice(0, i);
// => new Buffer('GET /abc HTTP/1.1\r\nHost: 0.0.0.0:3000\r\nContent-Length: 0');


// if the ending cannot be found -1 is returned
pasture.getHeaderEndingIndex(new Buffer('GET /abc HTTP/1.1\r\nHost: 0.0.0.0:3000\r\nContent-Length: 0\r\n'));
// => -1
```

#### pasture.readHeader(headerString)
```javascript
// read a header from a buffer into an object containing values
const req = new Buffer('GET /abc HTTP/1.1\r\nHost: 0.0.0.0:3000\r\nContent-Length: 0\r\n\r\n');
const i = pasture.getHeaderEndingIndex(req);
pasture.readHeader(req.slice(0, i));
// => {
//   host: '0.0.0.0:3000',
//   method: 'GET',
//   path: '/abc',
//   version: '1.1',
//   headers: { 'Content-Length': '0' }
// };
```

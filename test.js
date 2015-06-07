const pasture = require('./');
const desc = require('macchiato');

desc('.scan(chunk, lookingFor)')
.it('should return index of the start of the match', function (t) {
  const i = pasture.scan(new Buffer('abcdefghijk'), new Buffer('ghi'));
  t.equals(i, 6);
  t.end();
})

desc('.getHeaderEndingIndex(request)')
.it('should return back the correct index of the header ending', function (t) {
  const req = 'GET /abc HTTP/1.1\r\nHost: 0.0.0.0:3000\r\nContent-Length: 0\r\n\r\n';
  const i = pasture.getHeaderEndingIndex(new Buffer(req));
  t.equals(i, 56);
  t.end();
})
.it('should return back -1 if no header ending is found in chunk', function (t) {
  const req = 'GET /abc HTTP/1.1\r\nHost: 0.0.0.0:3000\r\nContent-Length: 0\r\n';
  const i = pasture.getHeaderEndingIndex(new Buffer(req));
  t.equals(i, -1);
  t.end();
})

desc('.readHeader(header)')
.it('should parse header into correct object', function (t) {
  const req = new Buffer('GET /abc HTTP/1.1\r\nHost: 0.0.0.0:3000\r\nContent-Length: 0\r\n\r\n');
  const i = pasture.getHeaderEndingIndex(req);
  const headers = pasture.readHeader(req.slice(0, i));
  t.eqls(headers, {
    host: '0.0.0.0:3000',
    method: 'GET',
    path: '/abc',
    version: '1.1',
    headers: { 'Content-Length': '0' }
  });
  t.end();
})

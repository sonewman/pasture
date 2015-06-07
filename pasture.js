

exports.scan = scan;
function scan(chunk, lookingFor) {
  const max = lookingFor.length;
  const lastIndex = max - 1;

  for (var i = 0, l = chunk.length; i < l; i += 1) {
    for (var k = 0; k < max; k += 1) {
      if (chunk[i + k] === lookingFor[k]) {
        if (k === lastIndex) return i;
      } else {
        break;
      }
    }
  }
  return -1;
}

const nl = 10;
const rt = 13;
const headerEnding = [rt, nl, rt, nl];

exports.getHeaderEndingIndex = getHeaderEndingIndex;
function getHeaderEndingIndex(buffer) {
  return scan(buffer, headerEnding);
}

function readFirstLine(line) {
  const firstLine = line.split(' ');
  return {
    method: firstLine[0],
    path: firstLine[1],
    version: firstLine[2].split('/')[1],
    headers: {}
  };
}

const headerSplitter = /\:\s*(.*)/;

exports.readHeader = readHeader;
function readHeader(header) {
  const head = header.toString();
  const lines = head.split('\r\n');
  const options = readFirstLine(lines[0]);
  const headers = options.headers;

  var foundHost = false;
  for (var i = 1, l = lines.length; i < l; i += 1) {
    var h = lines[i].split(headerSplitter);
    var k = h[0];
    var v = h[1];

    if (!foundHost) {
      if (k === 'host' || k === 'Host') {
        options.host = v;
        foundHost = true;
        continue;
      }
    }

    headers[k] = v;
  }

  return options;
}

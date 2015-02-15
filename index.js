var csv = require('csv-parser')
var fs = require('fs')
var formatData = require('format-data')
var minimist = require('minimist')

module.exports = NSLDSParser

function NSLDSParser(opts) {
  if (!(this instanceof NSLDSParser)) return new NSLDSParser(opts, cb)
  if (!opts) opts = {}
  if (!opts.format) opts.format = 'csv'
  this.opts = opts
}

NSLDSParser.prototype.parseFile = function(filename) {
  return this.parseStream(fs.createReadStream(filename))
}

NSLDSParser.prototype.parseStream = function(readStream) {
  var self = this
  var options = {
    separator: ':',
    headers: ['key', 'value']
  }
  return readStream.pipe(csv(options)).pipe(formatData(self.opts.format))
}

var argv = minimist(process.argv.slice(2));
var filename = argv._[2]
if (!argv.format) argv.format = 'ndjson'

var parser = new NSLDSParser({
  format: argv.format
})

var stream;
if (filename) stream = parser.parseFile(filename)
else stream = parser.parseStream(process.stdin)

stream.pipe(process.stdout)
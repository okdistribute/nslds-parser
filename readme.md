# nslds-parser
This module parses data obtained from the National Student Loan Data System found at https://www.nslds.ed.gov/nslds_SA/.

[![NPM](https://nodei.co/npm/nslds-parser.png)](https://nodei.co/npm/nslds-parser/)


# CLI Usage

```nslds-parser filename [--format csv,ndjson,json]```
Default format is ndjson.

```bash
$ npm install -g nslds-parser

$ nslds-parser MyStudentData.txt
...
{"key":"Loan Status Description","value":"LOAN ORIGINATED"}
{"key":"Loan Status Effective Date","value":"08/24/2008"}
{"key":"Loan Disbursement Date","value":"01/02/2009"}
{"key":"Loan Disbursement Amount","value":"$1,750"}
{"key":"Loan Disbursement Date","value":"08/24/2008"}
{"key":"Loan Disbursement Amount","value":"$1,750"}
...

$ cat MyStudentData.txt | nslds-parser --format csv
...
Loan Status Description,LOAN ORIGINATED
Loan Status Effective Date,08/24/2008
Loan Disbursement Date,01/02/2009
Loan Disbursement Amount,"$1,750"
Loan Disbursement Date,08/24/2008
Loan Disbursement Amount,"$1,750"
...
```

# JavaScript Usage

```bash
npm install nslds-parser
```

```js
var NSLDSParser = require('nslds-parser')

var parser = new NSLDSParser({
  format: 'csv'
})

var stream = parser.parseFile(filename)
var stream = parser.parseStream(process.stdin)
```
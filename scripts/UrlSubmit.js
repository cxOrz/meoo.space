const child_process = require('child_process')
const readline = require('readline')
const fs = require('fs')
const path = require('path')

const rl = readline.createInterface(fs.createReadStream(path.join(__dirname, '../urls.txt')))
let spawn

rl.on('line', (line) => {
  spawn = child_process.exec(`curl -H 'Content-Type:text/plain' -d ${line} "http://data.zz.baidu.com/urls?site=https://meoo.space&token=KLNCoTqhSAt0ZTds"`,(err,stdout,stderr)=>{
    console.log(stdout)
  })
})
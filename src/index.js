const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')
const { writeData } = require('./google-sheet')

function execute() {
  const sa_email = process.env.GOOG_SA_EMAIL
  const sa_key = process.env.GOOG_SA_KEY
  console.log(`connecting to google with sa email = ${sa_email} and sa_key = ${sa_key}`)
  const scope = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/calendar']
  const jwtClient = new google.auth.JWT(sa_email, null, sa_key, scope)
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err)
      return
    } else {
      console.log('Successfully connected! token = ', tokens)
      writeData(jwtClient)
    }
  })
  //   writeData(oauth)
}

module.exports = {
  execute,
}

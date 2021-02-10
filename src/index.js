const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')
const { writeData } = require('./google-sheet')
let sa_email
let sa_key
let scope

function initialize() {
  sa_email = process.env.GOOG_SA_EMAIL
  sa_key = process.env.GOOG_SA_KEY
  scope = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
}
function execute(payload) {
  initialize()
  const jwtClient = new google.auth.JWT(sa_email, null, sa_key, scope)
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err)
      return
    } else {
      writeData(jwtClient, payload).then((res) => {
        console.log('final res = ', res)
      }).catch(e => {
        console.log(e)
      })
    }
  })
}

function deleteFile(fileId) {
  initialize()
  const jwtClient = new google.auth.JWT(sa_email, null, sa_key, scope)
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err)
      return
    } else {
      const drive = google.drive({ version: 'v3', auth: jwtClient })
      drive.files.delete({
        fileId,
      }).then((res) => {
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
    }
  })
}
module.exports = {
  execute,
  deleteFile,
}

const { google } = require('googleapis')

const writeData = async (auth) => {
  try {
    const drive = google.drive({ version: 'v3', auth })
    const sheets = google.sheets({ version: 'v4', auth })
    const folders = await drive.files.list()
    console.log('folders = ', folders.data)
  } catch (e) {
    console.log('error = ', e)
  }
}

module.exports = {
  writeData,
}

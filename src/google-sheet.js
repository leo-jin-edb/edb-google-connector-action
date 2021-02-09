const { google } = require('googleapis')

const writeData = async (auth) => {
    try {
        console.log('write data called')
        const drive = google.drive({ version: 'v3', auth })
        const sheets = google.sheets({ version: 'v4', auth })
        const folders = await drive.files.list({}, auth)
        console.log('folders = ', folders)
    } catch (e) {
        console.log('error = ', e)
    }
}

module.exports = {
    writeData
}
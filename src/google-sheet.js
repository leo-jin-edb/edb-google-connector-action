const { google } = require('googleapis')

/**
 * payload: { ticketKey, transtionId, transitionName, timestamp}
 */
const writeData = async (auth, payload) => {
  const now = new Date()
  var dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
  // var timeOptions = { timeZone: 'UTC', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }
  const dateStr = new Intl.DateTimeFormat('en-US', dateOptions).format(now)
  // const timeStr = new Intl.DateTimeFormat('en-US', timeOptions).format(now)
  // const currentTimestamp = `${dateStr} ${timeStr}`
  // console.log(currentTimestamp)
  const reportSheetName = `bdr_ops_report_${dateStr.replace(/\//g, '_')}` // TODO: might want to do weekly or monthly
  const reportQuery = `name = '${reportSheetName}'`
  const folderQuery = `mimeType='application/vnd.google-apps.folder' and name='Ops_reporting'`

  try {
    const drive = google.drive({ version: 'v3', auth })
    const sheets = google.sheets({ version: 'v4', auth })
    const { ticketKey, transitionId, transitionName, timestamp: transitionTimestamp } = payload
   
    const folderRes = await drive.files.list({
      q: folderQuery,
    })
    if (folderRes.data.files.length === 1) {
      const reportingFolder = folderRes.data.files[0]
      const reportRes = await drive.files.list({
        q: reportQuery,
      })

      let reportId
      let reportValues

      const files = reportRes.data.files
      if (files.length === 0) {
        // not found, we create here
        const resource = {
          properties: {
            title: reportSheetName,
            locale: 'en',
            timeZone: 'UTC',
          },
        }
        const createRequest = {
          resource,
          fields: 'spreadsheetId',
        }
        const createRes = await sheets.spreadsheets.create(createRequest)
        const { spreadsheetId } = createRes.data
        const res = await drive.permissions.create({
          resource: {
            type: 'user',
            role: 'writer',
            emailAddress: 'leo.jin@enterprisedb.com', // Please set the email address you want to give the permission.
          },
          fileId: spreadsheetId,
          fields: 'id',
        })

        const moveRes = await drive.files.update({
          fileId: spreadsheetId,
          addParents: reportingFolder.id,
          fields: `id, parents`,
        })
        reportId = spreadsheetId
        reportValues = [
          ['Tickey Key', 'Transition Id', 'Transition Name', 'Transitioned On'],
          [ticketKey, transitionId, transitionName, transitionTimestamp],
        ]
      } else {
        reportId = files[0].id
        reportValues = [
          [ticketKey, transitionId, transitionName, transitionTimestamp],
        ]
      }

      await sheets.spreadsheets.values.append({
        spreadsheetId: reportId,
        range: 'Sheet1!A:A',
        valueInputOption: 'USER_ENTERED',
        resource: {
          majorDimension: 'ROWS',
          values: reportValues,
        },
      })
    }
  } catch (e) {
    console.log('error = ', e)
  }
}

module.exports = {
  writeData,
}

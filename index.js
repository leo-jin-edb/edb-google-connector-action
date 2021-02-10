const core = require('@actions/core')
const github = require('@actions/github')
const goog = require('./src/index')

try {
  const ticketKey = core.getInput('ticketKey')
  const transitionId = core.getInput('transitionId')
  const transitionName = core.getInput('transitionName')
  const timestamp = core.getInput('timestamp')
  if (ticketKey && ticketKey !== '') {
    core.info(`Found ticket info, we will sent data tickey key = '${ticketKey}'`)
    goog.execute({
      ticketKey,
      transitionId,
      transitionName,
      timestamp,
    })
  } else {
    core.info(`No ticket key found, skipping...`)
  }
} catch (error) {
  core.setFailed(error.message)
}

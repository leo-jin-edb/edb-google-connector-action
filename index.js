const core = require('@actions/core')
const github = require('@actions/github')
const goog = require('./src/index')

try {
  const metrics = core.getInput('metrics')
  if (ticketKey && ticketKey !== '') {
    core.info(`Found ticket info, we will sent data tickey key = '${ticketKey}'`)
    goog.execute(metrics)
  } else {
    core.info(`No ticket key found, skipping...`)
  }
} catch (error) {
  core.setFailed(error.message)
}

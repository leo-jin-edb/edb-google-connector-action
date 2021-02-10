const core = require('@actions/core')
const github = require('@actions/github')
const goog = require('./src/index')

try {
  let metrics = core.getInput('metrics')
  if (metrics) {
    core.info(`Metrics found metrics = ${metrics}`)
    metrics = JSON.parse(metrics)
    const { ticketKey } = metrics
    if (ticketKey && ticketKey !== '') {
      core.info(`Found ticket info, we will sent data tickey key = '${ticketKey}'`)
      goog.execute(metrics)
    } else {
      core.info(`No ticket key found, skipping...`)
    }
  } else {
    core.warning('No metrics found, skipping....')
  }
} catch (error) {
  core.setFailed(error.message)
}

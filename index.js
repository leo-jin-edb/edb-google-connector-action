const core = require('@actions/core')
const github = require('@actions/github')
const goog = require('./src/index')

try {
  // let metrics = core.getInput('metrics')
  // if (metrics) {
  //   core.info(`Metrics found metrics = ${metrics}`)
  //   metrics = JSON.parse(metrics)
  //   const { ticketKey } = metrics
  //   if (ticketKey && ticketKey !== '') {
  //     core.info(`Found ticket info, we will sent data tickey key = '${ticketKey}'`)
  //     goog.execute(metrics)
  //   } else {
  //     core.info(`No ticket key found, skipping...`)
  //   }
  // } else {
  //   core.warning('No metrics found, skipping....')
  // }

  const { client_payload } = github.context.payload
  if(client_payload) {
    core.info(`Found client payload ${JSON.stringify(client_payload, null, 2)}, proceed with processing`)
    goog.execute(client_payload)
  }
  
} catch (error) {
  core.setFailed(error.message)
}

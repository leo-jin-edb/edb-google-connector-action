const core = require("@actions/core");
const github = require("@actions/github");
const goog = require('./src/index')

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  const ticketKey = core.getInput("ticketKey");
  console.log(`Hello ${nameToGreet}! ticketKey = ${ticketKey}`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
  goog.execute()
} catch (error) {
  core.setFailed(error.message);
}

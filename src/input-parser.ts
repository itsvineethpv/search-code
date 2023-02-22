import * as core from '@actions/core'
import {ActionInputs} from './search-inputs'
import {Inputs} from './constants'

/**
 * Helper to get all the inputs for the action
 */
export function getInputs(): ActionInputs {
  const searchString = core.getInput(Inputs.searchString)
  const fileNamePattern = core.getInput(Inputs.fileNamePattern)
  const filePathPattern = core.getInput(Inputs.filePathPattern)
  const organization = core.getInput(Inputs.organization)
  const user = core.getInput(Inputs.user)
  const repository = core.getInput(Inputs.repository)
  const token = core.getInput(Inputs.token)
  const notifyTo = core.getInput(Inputs.notifyTo)
  const language = core.getInput(Inputs.language)
  const extension = core.getInput(Inputs.extension)

  core.debug(`BASE URL FROM ENV : ${process.env.GITHUB_API_URL} `)
  core.debug(
    `Input list : searchString : ${searchString} fileNamePattern : ${fileNamePattern} filePathPattern : ${filePathPattern} organization : ${organization} user : ${user} repository : ${repository} token : ${token} notifyTo : ${notifyTo} language : ${notifyTo} extension : ${notifyTo} `
  )
  const baseUrl = process.env.GITHUB_API_URL || 'https://api.github.com'

  let searchQuery = ''

  if (!searchString && !fileNamePattern) {
    searchQuery = '' // This is to bypass the eslint error.
    core.setFailed('Either a string or filename is mandatory !!')
  } else {
    if (searchString) {
      searchQuery = searchQuery.concat(searchString)
      core.debug(
        `Found searchString input ,Query updated to ...  : ${searchQuery}`
      )
    }
    if (fileNamePattern) {
      if (searchString) {
        searchQuery = searchQuery.concat('+filename:', fileNamePattern)
      } else {
        searchQuery = searchQuery.concat('filename:', fileNamePattern)
      }
      core.debug(
        `Found fileNamePattern input ,Query updated to ...  : ${searchQuery}`
      )
    }
    if (filePathPattern) {
      searchQuery = searchQuery.concat('+path:', filePathPattern)
      core.debug(
        `Found filePathPattern input ,Query updated to ...  : ${searchQuery}`
      )
    }
    if (language) {
      searchQuery = searchQuery.concat('+language:', language)
      core.debug(`Query updated to ...  : ${searchQuery}`)
    }
    if (extension) {
      searchQuery = searchQuery.concat('+extension:', extension)
      core.debug(
        `Found extension input ,Query updated to ...  : ${searchQuery}`
      )
    }

    /*
        Choose the scope. Precendence organization > user > repository
    */
    if (organization) {
      searchQuery = searchQuery.concat('+org:', organization)
      core.debug(
        `Found organization input ,Query updated to ...  : ${searchQuery}`
      )
    } else if (user) {
      searchQuery = searchQuery.concat('+user:', user)
      core.debug(`Found user input , Query updated to ...  : ${searchQuery}`)
    } else if (repository) {
      searchQuery = searchQuery.concat('+repo:', repository)
      core.debug(
        `Found reponame input , Query updated to ...  : ${searchQuery}`
      )
    }

    core.debug(`Generated Search Query : ${searchQuery}`)
  }

  const params = {
    searchQuery,
    token,
    notifyTo,
    baseUrl
  } as ActionInputs

  return params
}

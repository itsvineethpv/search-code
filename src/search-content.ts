import * as core from '@actions/core'
import {Octokit} from 'octokit/'
import {getInputs} from './input-parser'
import {searchOutput} from './search-output'

async function run(): Promise<void> {
  try {
    core.info(`Searching for the content`)
    const inputList = getInputs()
    const q = inputList.searchQuery
    const encodedQuery = encodeURIComponent(q)
    const queryString = `q=${encodedQuery}`
    core.info(`Generated Query String ${queryString}`)
    core.info(`Generated Query String [ without encoding ] ${q}`)
    core.info(`baseUrl : ${inputList.baseUrl}`)

    const octokit = new Octokit({
      auth: inputList.token,
      baseUrl: inputList.baseUrl
    })

    const response = await octokit.paginate(octokit.rest.search.code, {
      q
    })

    const convertToInterfacesearchOutput = (value: {
      name: string
      path: string
      url: string
      repository: {full_name: string}
    }): searchOutput => {
      return {
        file: value.name,
        path: value.path,
        url: value.url,
        repository: String(value.repository.full_name)
      }
    }

    const list = response.map(convertToInterfacesearchOutput)

    const resultsRows: string[][] = [[]]

    const resultsHeader = [
      {data: 'File', header: true},
      {data: 'Path', header: true},
      {data: 'Repository', header: true},
      {data: 'URL', header: true}
    ]
    for (const item of list) {
      resultsRows.push([
        `${item.file}`,
        ` ${item.path}`,
        `${item.repository} `,
        `${item.url}`
      ])
    }

    await core.summary
      .addHeading(':eyes: Search Results :eyes:')
      .addTable([resultsHeader, ...resultsRows])
      .write()

    // Show the result of the conversion
    core.info(JSON.stringify(list, null, 2))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

# Search and report the usage of string in the specified scope

<p align="left">
  <a href="https://github.com/pv-vineeth/search-and-alert"><img alt="earch-and-alert build status" src="https://github.com/pv-vineeth/search-and-alert/workflows/build-test/badge.svg"></a>
</p>

Search and alert the usage of a string in the specified usage such as org , user or repo. 

|    input           | Description    |                                            
|-----------------   |-------------------------------------------------------------------   |
| searchString       |  Provide the string to search. Search will be performed in all the repositories in specified Scope |
| fileNamePattern  |  Search will be performed in the files matching with provided pattern |
| filePathPattern  |  Search will be performed in the directories matching with provided pattern |
| organization       |  Provide the target user. Search will be performed in all the repositories of specified organization | 
| user               |  Provide the target user. Search will be performed in all the repositories of specified user |
| repository         |  Provide the target repo. Search will be performed in the specified repo |
| token              |  GitHub Authentication token. All public repos will be scanned if the value not provided |
| notifyTo           |  Send the notification to mentioned users/teams. Comma seperated values |
|  | |

# Usage

See [action.yml](action.yml)

```yaml
steps:
- uses: pv-vineeth/search-and-alert@v1.0
  with:
    searchString: 'search me'
    organization: 'pv-vineeth'
    file-name-pattern: 'main.ts'
    file-path-pattern: 'src/*'
    notifyTo: 'itsvineethpv,pv-vineeth/team-owners.'

```

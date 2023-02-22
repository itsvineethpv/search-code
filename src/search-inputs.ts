export interface ActionInputs {
  /**
   * Search Query generated from the inputs.
   */
  searchQuery: string

  /**
   * GitHub Authentication token. All public repos will be scanned if the value not provided
   */
  token: string

  /**
   * Send the notification to mentioned users/teams. Comma seperated values
   */
  notifyTo: string

  /**
   * Base API URL
   */
  baseUrl: string
}

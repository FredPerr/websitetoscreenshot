export const URLBarStates = {
    idle: '',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
}

export type URLBarStateType = keyof typeof URLBarStates

export const URLBarErrors = {
    invalidURL: 'Invalid URL',
    emptyURL: 'No URL was provided',
    invalidResponse: 'Invalid response returned while fetching URL',
    laggyURL: 'Website is not responsive enough to be used (+3500ms latency)',
}

export type URLBarErrorType = keyof typeof URLBarErrors

export { default } from './URLBar'

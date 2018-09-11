import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  youtubePopularRequest: [],
  youtubePopularSuccess: ['payload'],
  youtubePopularFailure: null,
  youtubeSearchRequest: ['term'],
  youtubeSearchSuccess: ['payload'],
  youtubeSearchFailure: null,
})

export const YoutubeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  popularData: null,
  popularFetching: null,
  popularPayload: null,
  popularError: null,
  searchData: null,
  searchFetching: null,
  searchPayload: null,
  searchError: null,
})

/* ------------- Selectors ------------- */

export const YoutubeSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// popularRequest the data from an api
export const popularRequest = (state, { data }) =>
  state.merge({ popularFetching: true, popularData: data, popularPayload: null })

export const searchRequest = (state, { data }) =>
  state.merge({ searchFetching: true, searchData: data, searchPayload: null })

// successful api lookup
export const popularSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ popularFetching: false, popularError: null, popularPayload:payload })
}

export const searchSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ searchFetching: false, searchError: null, searchPayload:payload })
}

// Something went wrong somewhere.
export const popularFailure = state =>
  state.merge({ popularFetching: false, popularError: true, popularPayload: null })

export const searchFailure = state =>
  state.merge({ searchFetching: false, searchError: true, searchPayload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.YOUTUBE_POPULAR_REQUEST]: popularRequest,
  [Types.YOUTUBE_POPULAR_SUCCESS]: popularSuccess,
  [Types.YOUTUBE_POPULAR_FAILURE]: popularFailure,
  [Types.YOUTUBE_SEARCH_REQUEST]: searchRequest,
  [Types.YOUTUBE_SEARCH_SUCCESS]: searchSuccess,
  [Types.YOUTUBE_SEARCH_FAILURE]: searchFailure,
})

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
  youtubeRelatedRequest: ['videoId'],
  youtubeRelatedSuccess: ['payload'],
  youtubeRelatedFailure: null,
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
  relatedData: null,
  relatedFetching: null,
  relatedPayload: null,
  relatedError: null,
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

export const relatedRequest = (state, { data }) =>
  state.merge({ relatedFetching: true, relatedData: data, relatedPayload: null })

// successful api lookup
export const popularSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ popularFetching: false, popularError: null, popularPayload:payload })
}

export const searchSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ searchFetching: false, searchError: null, searchPayload:payload })
}

export const relatedSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ relatedFetching: false, relatedError: null, relatedPayload:payload })
}

// Something went wrong somewhere.
export const popularFailure = state =>
  state.merge({ popularFetching: false, popularError: true, popularPayload: null })

export const searchFailure = state =>
  state.merge({ searchFetching: false, searchError: true, searchPayload: null })

export const relatedFailure = state =>
  state.merge({ relatedFetching: false, relatedError: true, relatedPayload: null })
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.YOUTUBE_POPULAR_REQUEST]: popularRequest,
  [Types.YOUTUBE_POPULAR_SUCCESS]: popularSuccess,
  [Types.YOUTUBE_POPULAR_FAILURE]: popularFailure,
  [Types.YOUTUBE_SEARCH_REQUEST]: searchRequest,
  [Types.YOUTUBE_SEARCH_SUCCESS]: searchSuccess,
  [Types.YOUTUBE_SEARCH_FAILURE]: searchFailure,
  [Types.YOUTUBE_RELATED_REQUEST]: relatedRequest,
  [Types.YOUTUBE_RELATED_SUCCESS]: relatedSuccess,
  [Types.YOUTUBE_RELATED_FAILURE]: relatedFailure,
})

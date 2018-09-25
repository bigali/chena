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
  getInfoRequest: ['videoId'],
  getInfoSuccess: ['payload'],
  getInfoFailure: null,
  getInfoPlayNowRequest: ['array'],
  getInfoPlayNowSuccess: ['payload'],
  getInfoPlayNowFailure: null,
  getInfoListRequest: ['videoId'],
  getInfoListSuccess: ['payload'],
  getInfoListFailure: null,
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
  trackInfoData: null,
  trackInfoFetching: null,
  trackInfoPayload: null,
  trackInfoError: null,
  trackInfoPlayNowData: null,
  trackInfoPlayNowFetching: null,
  trackInfoPlayNowPayload: null,
  trackInfoPlayNowError: null,
  trackInfoListData: null,
  trackInfoListFetching: null,
  trackInfoListPayload: null,
  trackInfoListError: null,
})

/* ------------- Selectors ------------- */

export const YoutubeSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// popularRequest the data from an api
export const popularRequest = (state, { data }) =>
  state.merge({ popularFetching: true, popularData: data, popularPayload: null })

// successful api lookup
export const popularSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ popularFetching: false, popularError: null, popularPayload:payload })
}

// Something went wrong somewhere.
export const popularFailure = state =>
  state.merge({ popularFetching: false, popularError: true, popularPayload: null })



export const searchRequest = (state, { data }) =>
  state.merge({ searchFetching: true, searchData: data, searchPayload: null })

export const searchSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ searchFetching: false, searchError: null, searchPayload:payload })
}

export const searchFailure = state =>
  state.merge({ searchFetching: false, searchError: true, searchPayload: null })



export const relatedRequest = (state, { data }) =>
  state.merge({ relatedFetching: true, relatedData: data, relatedPayload: null })

export const relatedSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ relatedFetching: false, relatedError: null, relatedPayload:payload })
}

export const relatedFailure = state =>
  state.merge({ relatedFetching: false, relatedError: true, relatedPayload: null })


export const trackInfoRequest = (state, { data }) =>
  state.merge({ trackInfoFetching: true, trackInfoData: data, trackInfoPayload: null })

export const trackInfoSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ trackInfoFetching: false, trackInfoError: null, trackInfoPayload:payload })
}

export const trackInfoFailure = state =>
  state.merge({ trackInfoFetching: false, trackInfoError: true, trackInfoPayload: null })


export const trackInfoPlayNowRequest = (state, { data }) =>
  state.merge({ trackInfoPlayNowFetching: true, trackInfoPlayNowData: data, trackInfoPlayNowPayload: null })

export const trackInfoPlayNowSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ trackInfoPlayNowFetching: false, trackInfoPlayNowError: null, trackInfoPlayNowPayload:payload })
}

export const trackInfoPlayNowFailure = state =>
  state.merge({ trackInfoPlayNowFetching: false, trackInfoPlayNowError: true, trackInfoPlayNowPayload: null })


export const trackInfoListRequest = (state, { data }) =>
  state.merge({ trackInfoListFetching: true, trackInfoListData: data, trackInfoListPayload: null })

export const trackInfoListSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ trackInfoListFetching: false, trackInfoListError: null, trackInfoListPayload:payload })
}

export const trackInfoListFailure = state =>
  state.merge({ trackInfoListFetching: false, trackInfoListError: true, trackInfoListPayload: null })

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
  [Types.GET_INFO_REQUEST]: trackInfoRequest,
  [Types.GET_INFO_SUCCESS]: trackInfoSuccess,
  [Types.GET_INFO_FAILURE]: trackInfoFailure,
  [Types.GET_INFO_PLAY_NOW_REQUEST]: trackInfoPlayNowRequest,
  [Types.GET_INFO_PLAY_NOW_SUCCESS]: trackInfoPlayNowSuccess,
  [Types.GET_INFO_PLAY_NOW_FAILURE]: trackInfoPlayNowFailure,
  [Types.GET_INFO_LIST_REQUEST]: trackInfoListRequest,
  [Types.GET_INFO_LIST_SUCCESS]: trackInfoListSuccess,
  [Types.GET_INFO_LIST_FAILURE]: trackInfoListFailure,
})

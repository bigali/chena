/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import YoutubeActions from '../Redux/YoutubeRedux'
// import { YoutubeSelectors } from '../Redux/YoutubeRedux'

export function * getPopular (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(YoutubeSelectors.getData)
  // make the call to the api
  const response = yield call(api.getPopular, data)

  // popularSuccess?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(YoutubeActions.youtubePopularSuccess(response.data))
  } else {
    yield put(YoutubeActions.youtubePopularFailure())
  }
}
export function * getSearch (api, action) {
  const { term } = action
  // get current data from Store
  // const currentData = yield select(YoutubeSelectors.getData)
  // make the call to the api
  const response = yield call(api.getSearch, term)

  // popularSuccess?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(YoutubeActions.youtubeSearchSuccess(response.data))
  } else {
    yield put(YoutubeActions.youtubeSearchFailure())
  }
}


export function * getRelated (api, action) {
  const { videoId } = action
  // get current data from Store
  // const currentData = yield select(YoutubeSelectors.getData)
  // make the call to the api
  const response = yield call(api.getRelated, videoId)

  // popularSuccess?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(YoutubeActions.youtubeRelatedSuccess(response.data))
  } else {
    yield put(YoutubeActions.youtubeRelatedFailure())
  }
}

export function * getInfo (api, action) {
  const { videoId } = action
  // get current data from Store
  // const currentData = yield select(YoutubeSelectors.getData)
  // make the call to the api
  const response = yield call(api.getInfo, videoId)

  // popularSuccess?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(YoutubeActions.getInfoSuccess(response.data))
  } else {
    yield put(YoutubeActions.getInfoFailure())
  }
}

export function * getInfoPlayNow (api, action) {
  const { videoId } = action
  // get current data from Store
  // const currentData = yield select(YoutubeSelectors.getData)
  // make the call to the api
  const response = yield call(api.getInfoPlayNow, videoId)

  // popularSuccess?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(YoutubeActions.getInfoPlayNowSuccess(response.data))
  } else {
    yield put(YoutubeActions.getInfoPlayNowFailure())
  }
}


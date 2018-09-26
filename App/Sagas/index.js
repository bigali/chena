import { takeLatest, all } from 'redux-saga/effects'
import YOUTUBE_API from '../Services/YoutubeApi'
import EXTRACT_AUDIO_API from '../Services/ExtractAudioApi'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { YoutubeTypes } from '../Redux/YoutubeRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import {getPopular, getRelated, getSearch, getInfoPlayNow} from './YoutubeSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const youtube_api = DebugConfig.useFixtures ? FixtureAPI : YOUTUBE_API.create()
const extract_audio_api = DebugConfig.useFixtures ? FixtureAPI : EXTRACT_AUDIO_API.create()


/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(YoutubeTypes.YOUTUBE_POPULAR_REQUEST, getPopular, youtube_api),
    takeLatest(YoutubeTypes.YOUTUBE_SEARCH_REQUEST, getSearch, youtube_api),
    takeLatest(YoutubeTypes.YOUTUBE_RELATED_REQUEST, getRelated, youtube_api),
    takeLatest(YoutubeTypes.GET_INFO_PLAY_NOW_REQUEST, getInfoPlayNow, extract_audio_api )
  ])
}

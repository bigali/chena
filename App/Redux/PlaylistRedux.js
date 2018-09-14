import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import mergers from 'seamless-immutable-mergers'
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addPlaylist: ['name'],
  addToPlaylist: ['id', 'song']
})

export const PlaylistTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  playlists: []
})

/* ------------- Selectors ------------- */

export const PlaylistSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

export const addPlaylist = (state, action) => {
  console.log("payload: ", action)
  console.log("state.playlist: ", state.playlists)
  return state.merge({playlists: [...state.playlists, {name: action.name, songs: []}]})
}

/*
 [id]: {
        ...playlist,
        songs: playlist.songs.concat(song)
      }
*/
const add =(playlists , song, id) => {
  var obj = Immutable({foo: {bar: 1}});
  Immutable.updateIn(obj, ["foo", "bar"], add, 10);
// returns Immutable({foo: {bar: 11}})
}
export const addToPlaylist = (state, action) => {
  const {id, song} = action

  return state.setIn(['playlists', id, 'songs'], [...state.playlists[id].songs, song])
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PLAYLIST]: addPlaylist,
  [Types.ADD_TO_PLAYLIST]: addToPlaylist
})

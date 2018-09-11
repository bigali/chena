// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'https://www.googleapis.com/youtube/v3/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  /*const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')*/
  //GET https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=FR&videoCategoryId=10&key={YOUR_API_KEY}
  const getPopular = () => api.get('videos', {part:'snippet',chart:'mostPopular',regionCode:'FR', videoCategoryId: 10,maxResults:25, key:'AIzaSyC3MHM0IHsxuyJxwCb2Eze2WaG9NsWCrU8'})
  //https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=soolking&regionCode=FR&key=AIzaSyC3MHM0IHsxuyJxwCb2Eze2WaG9NsWCrU8
  const getSearch = (term) => api.get('search' , {part: 'snippet',maxResults: 25, q: term, regionCode: 'FR',type:'video', videoCategoryId: 10,key:'AIzaSyC3MHM0IHsxuyJxwCb2Eze2WaG9NsWCrU8'})
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    /*getRoot,
    getRate,*/
    getPopular,
    getSearch
  }
}

// let's return back our create method as the default.
export default {
  create
}

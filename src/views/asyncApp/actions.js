import Axios from 'axios'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function initialDateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

export function requestPosts (subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export function receivePosts (subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.data.children.map(child => child),
    receivedAt: new Date(),
    subreddit
  }
}


export const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))

  return Axios.get(`http://www.subreddit.com/r/${subreddit}.json`)
    .then(res => {
      dispatch(receivePosts(subreddit, res.data))
    })
}

function shouldFetchPosts(state, subreddit) {

  // 查看store‘reactjs’, 'frontend' 是否有数据
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if(posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    } else {
      return Promise.resolve()
    }
  }
}
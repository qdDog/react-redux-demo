import Axios from 'axios'

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

/*************** 同步action ***************/

// 选择reactjs or frontend 来请求指定url
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
} 

// 刷新帖子列表
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

/*************** 异步action ***************/
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.children.map( child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchPosts(subreddit) {
  return function(dispatch) {
    dispatch(requestPosts(subreddit))

    return Axios.get(`http://www.subreddit.com/r/${subreddit}.json`)
      .then(res => {
        dispatch(receivePosts(subreddit, res.data.data))
      })
  }
}

function shouldFetchPosts(state, subreddit) {
  // postsBySubreddit: 由reducer（postsBySubreddit）注入到store里面。
  // 查看store‘reactjs’, 'frontend' 是否有数据
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {

  // 当缓存的值是可用时， 减少网络请求
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    } else {
      return Promise.resolve()
    }
  }
}

import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from './action1'

// 选择要显示的 subreddit
function selectedSubreddit(state = 'reactjs', action) {
  switch(action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

// isFetching 显示进度条
// didInvalidate 数据是否过期
// lastUpdated 数据最后更新时间
// items       列表信息
function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch(action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true,
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch(action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:     
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

 export default rootReducer

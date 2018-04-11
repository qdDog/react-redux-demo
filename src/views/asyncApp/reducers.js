
import { combineReducers } from 'redux'
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT
} from './actions'

const initialState = {
  isFetching: false,
  didInitialDate: false,
  items: []
}

function posts(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInitialDate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInitialDate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInitialDate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

function selectSubreddit(state = 'reactjs', action) {
  switch(action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }      
    default:
      return state
  }
}

const rootReducers = combineReducers({
  posts,
  selectSubreddit,
  postsBySubreddit
})

 export default rootReducers
 
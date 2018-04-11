import { combineReducers } from 'redux'
import {
  ADD_TODO,
  COMPLETE_TODO,
  VisibilityFilters,
  SET_VISIBILITY_FILTER
} from './action'


const { SHOW_ALL } = VisibilityFilters

export const initialState = {
  visibilityFilters: VisibilityFilters.SHOW_ALL,
  todos: []
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      console.log(state[action.index].text)
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: !state[action.index].completed,
          text: state[action.index].text
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

function visibilityFilters(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state;
  }
}

const todoApp = combineReducers({
  visibilityFilters,
  todos
})

export default todoApp

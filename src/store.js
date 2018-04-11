import { createStore } from 'redux'
import todoApp from './views/todo/reducer'


const store = createStore(todoApp)
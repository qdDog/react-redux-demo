import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
// import todoApp from './views/todo/reducer'
// import rootReducers from './views/todo/reducers1'
import rootReducers from './views/asyncApp/reducers'
import { initialState } from './views/todo/reducer'


const loggerMiddleware = createLogger()

const store = createStore(
  rootReducers, 
  // initialState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();

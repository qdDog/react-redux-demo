import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import TodoApp from './views/todo/index'
import AsyncAppa from './views/todo/containers/post/AsyncApp'
import AsyncApp from './views/asyncApp/AsyncApp'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' exact component={AsyncApp} />
          <Route path='/async'component={AsyncAppa} />
        </div>
      </Router>
    );
  }
}

export default App;

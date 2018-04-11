import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddTodo from '../todo/containers/AddTodo'
import VisibileTodoList  from '../todo/containers/VisibileTodoList'
import FilterLink  from '../todo/containers/FilterLink'
import TodoList  from './components/TodoList'
import Footer from './components/Footer'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './action'

class TodoApp extends Component {
  render() {
    const { dispatch, visibilityFilter } = this.props
    return (
      <div>
        <AddTodo 
          onAddClick={text => dispatch(addTodo(text))}
        />
        <TodoList 
          todos={this.props.todos}
          onTodoClick={ index => 
            dispatch(completeTodo(index))
          }
          />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter => dispatch(setVisibilityFilter(nextFilter))}
        />
      </div>
    )
  }
}

function selectTodos(todos, filter) {
  switch(filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
    default:
      return todos.filter(todo => !todo.completed)
  }
}

const mapStateToProps = state => {

  console.log(state)
  return {
    todos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilters
  }
}
// class TodoApp extends Component {
//   render() {
//     return (
//       <div>
//         <AddTodo />
//         <TodoList />
//         <Footer />
//       </div>
//     )
//   }
// }

export default connect(mapStateToProps)(TodoApp)

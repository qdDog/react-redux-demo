import { connect } from 'react-redux'
import { completeTodo } from '../action'
import TodoList  from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  if(Array.isArray(todos)) {
    switch (filter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
      default:
        return todos.filter(t => !t.completed)
    }
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilters)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(completeTodo(id))
    }
  }
}

const getVisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)

export default getVisibleTodoList

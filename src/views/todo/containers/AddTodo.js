import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../action'

let AddTodo = ({ onAddClick }) => {
  let input
  const handleClick = () => {
    const text = input.value.trim()
    onAddClick(text)
  }
  return (
    <div>
      <input type='text' ref={node =>  input = node } />
      <button onClick={handleClick}>Add Todo</button>
    </div>
  )
}

AddTodo = connect()(AddTodo)

export default AddTodo

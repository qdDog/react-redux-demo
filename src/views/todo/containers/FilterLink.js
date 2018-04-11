import { connect } from 'react-redux'
import { setVisibilityFilter, VisibilityFilters } from '../action'
import TodoLink from '../components/TodoLink'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoLink)

export default FilterLink

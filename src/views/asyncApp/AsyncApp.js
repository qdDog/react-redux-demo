import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  initialDateSubreddit,
  fetchPostsIfNeeded, 
  selectSubreddit
} from './actions'

class AsyncApp extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.selectSubreddit !== this.props.selectSubreddit) {
      const { dispatch, selectSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectSubreddit))
    }
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded('reactjs'))
  }
  handleClick = (e) => {
    const nextSubreddit = e.target.value
    this.props.dispatch(selectSubreddit(nextSubreddit))
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick = (e) => {
    e.preventDefault()
    const { dispatch, selectSubreddit } = this.props
    dispatch(initialDateSubreddit(selectSubreddit))
    dispatch(fetchPostsIfNeeded(selectSubreddit))
  }
  render() {

    const { isFetching, lastUpdated, posts, selectSubreddit } = this.props
    return (
      <div>
        <h1>{selectSubreddit}</h1>
        <select onChange={this.handleClick}>
          <option value="reactjs">reactjs</option>
          <option value="frontend">frontend</option>
        </select>
        <div>
          <span> Last updated at {new Date(lastUpdated).toLocaleTimeString()}&nbsp;</span>
          <a onClick={this.handleRefreshClick}>Refresh</a>
        </div>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {
          posts.length > 0 &&
          <ul>
            {posts.map((item, index) => 
              <li key={index}>{item.data.title}</li>
            )}
          </ul>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectSubreddit] || { 
    isFetching: true,
    items: []
  }

  return {
    posts,
    isFetching,
    lastUpdated,
    selectSubreddit,
  }
}

AsyncApp = connect(mapStateToProps)(AsyncApp)

export default AsyncApp
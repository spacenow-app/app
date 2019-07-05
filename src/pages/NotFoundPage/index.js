import React from 'react'

const NotFoundPage = props => {
  return (
    <div style={{ border: '1px solid red' }}>
      <h1>Not Found</h1>
      <h3>Location</h3>
      <p>Pathname: {props.location.pathname}</p>
      <h3>Match</h3>
      <p>isExact: {props.match.isExact ? 'Yes' : 'No'}</p>
      <p>Path: {props.match.path}</p>
      <p>Url: {props.match.url}</p>
    </div>
  )
}

export default NotFoundPage

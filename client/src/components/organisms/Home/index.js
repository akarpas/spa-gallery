import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import style from './index.scss'

class Home extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <h1>New York</h1>
        <h2>Flickr's Best 100</h2>
        <Link className={style.link} to={`/gallery/${1}`}>Start Browsing</Link>
      </div>
    )
  }

}

export default withRouter(Home)
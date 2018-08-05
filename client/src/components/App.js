
import React from 'react'
import Gallery from './organisms/Gallery'

import style from './App.scss'

class App extends React.Component {
  componentWillMount() {
    console.log("dispatch a default action")
  }

  render() {
    return (
      <div className={style.content}>
        <h2> Type anything you want to get photos of i.e. New York</h2>
        <input className={style.input} placeholder='Search Flickr Images...' />
        <Gallery />
      </div>
    )
  }
}

export default App

import React from 'react'
import {
  Route,
  HashRouter
} from 'react-router-dom'
import Gallery from './organisms/Gallery'

import style from './App.scss'

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className={style.mainContainer}>
          <div className={style.content}>
            <Route path="/gallery/:pageId" component={Gallery}/>
          </div>
        </div>  
      </HashRouter>
    )
  }
}

export default App
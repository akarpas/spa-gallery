
import React from 'react'
import {
  Route,
  Router,
  HashRouter,
  Switch
} from 'react-router-dom'
import Gallery from './organisms/Gallery'
import LightBox from './atoms/LightBox'

import style from './App.scss'

class App extends React.Component {
  // <Route path="/gallery/:pageId/photo" component={LightBox}/>
  render() {
    return (
        <div className={style.mainContainer}>
          <div className={style.content}>
          <HashRouter>
            <Route path="/gallery/:pageId" component={Gallery}/>
          </HashRouter>
          </div>
        </div>  
    )
  }
}

export default App
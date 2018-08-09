
import React from 'react'
import {
  Route,
  HashRouter,
  Switch
} from 'react-router-dom'
import Gallery from './organisms/Gallery'
import Home from './organisms/Home'

import style from './App.scss'

class App extends React.Component {
  render() {
    return (
        <div className={style.mainContainer}>
          <div className={style.content}>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/gallery/:pageId" component={Gallery}/>
            </Switch>
          </HashRouter>
          </div>
        </div>  
    )
  }
}

export default App
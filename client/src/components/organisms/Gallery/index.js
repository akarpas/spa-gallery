import React from 'react'
import Column from '../../molecules/Column'

import style from './index.scss'

class Gallery extends React.Component {
  render() {
    return (
      <div className={style.gallery}>
        <div className={style.row}>
          <Column />
          <Column />
          <Column />
          <Column />
        </div>
      </div>
    )
  }
}

export default Gallery
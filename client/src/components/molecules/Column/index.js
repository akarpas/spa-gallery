import React from 'react'
import _ from 'lodash'
import style from './index.scss'

class Column extends React.Component {
  render() {
    return (
      <div className={style.column}>
        {_.map(this.props.data, (image, index) => {
          return (
            <div key={`holder${index}`} className={style.container}>
              <img key={`img${index}`} src={image.url}/>
              <div className={style.center}>{image.username}</div>
            </div>
          ) 
        })}
      </div>
    )
  }
}

export default Column
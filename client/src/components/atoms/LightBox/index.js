import React from 'react'
import style from './index.scss'

class LightBox extends React.Component {
  ignore = (e) => {
    e.stopPropagation()
  }
  render() {
    const { username, realName, title, profileUrl } = this.props.imageInfo
    return (
      <div className={style.overlay} onClick={(e) => this.props.toggleModal(e)}>
        <div className={style.close} onClick={(e) => this.props.toggleModal(e)}> - CLOSE - </div>
        <div className={style.imageContainer} onClick={(e) => this.ignore(e)}>
          <img className={style.image} src={this.props.image}/>
          {title &&
            <div className={style.details}><strong>Title: </strong> {title} </div>}
          {username &&
            <div className={style.details}><strong>Username: </strong> {username} </div>}
          {realName &&
            <div className={style.details}><strong>Real Name: </strong> {realName} </div>}
          {profileUrl &&
            <div className={style.details}>
              <strong>Profile: </strong> <a href={profileUrl} target="_blank"> Visit </a>
            </div>}  
        </div>
      </div>
    )
  }
}

export default LightBox
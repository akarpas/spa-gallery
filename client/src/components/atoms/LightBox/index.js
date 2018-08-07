import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import style from './index.scss'

class LightBox extends React.Component {
  render() {
    return (
      <div className={style.overlay} id="closeA" onClick={(e) => this.props.toggleModal(e)}>
        <div className={style.close} id="closeB" onClick={(e) => this.props.toggleModal(e)}> X - CLOSE - X</div>
        <div className={style.imageContainer}>
          <img className={style.image} src={this.props.image}/>
        </div>
      </div>
    )
  }
}

export default withRouter(LightBox)
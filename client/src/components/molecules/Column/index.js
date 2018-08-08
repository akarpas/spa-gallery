import React from 'react'
import LightBox from '../../atoms/LightBox'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import style from './index.scss'

class Column extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      imageUrl: '',
      hash: ''
    }
    this.props.history.listen((location, action) => {
      if (location.hash === this.state.hash) {
        this.setState({ showModal: false })
      }
    })
  }

  componentDidUpdate() {
    window.onpopstate = (e) => {
      e.preventDefault()
      this.closeModal()
    }
  }

  componentWillUnmount() {
    window.onpopstate = () => {}
  }

  closeModal = () => {
    this.props.history.push(this.props.page)
    this.setState({ showModal: false })
  }

  toggleModal = (e, url) => {
    e.preventDefault()
    const { id } = e.target
    this.setState({ showModal: !this.state.showModal, imageUrl: id, hash: "#box" })
  }

  render() {
    return (
      <div className={style.column}>
        {_.map(this.props.data, (image, index) => {
          const { username, realName, profileUrl } = image.user
          const { title, url } = image.photo
          return (
              <div key={`holder${index}`} className={style.container}>
                <img className={style.thumbnail} key={`img${index}`} src={url}/>
                <div
                  id={url}
                  onClick={(e) => this.toggleModal(e, url)}
                  className={style.center}>
                  {username}
                </div>
                {
                  this.state.showModal &&
                    <LightBox id="box"
                      toggleModal={this.toggleModal}
                      image={this.state.imageUrl}
                      imageInfo={{
                        username,
                        realName,
                        profileUrl,
                        title
                      }}
                    />
                }
              </div>
          )
        })}
      </div>
    )
  }
}

export default withRouter(Column)
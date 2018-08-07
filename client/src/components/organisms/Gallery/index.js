import React from 'react'
import { connect } from 'react-redux'
import Column from '../../molecules/Column'
import Pagination from '../../atoms/Pagination'
import { BounceLoader } from 'react-spinners'
import * as actionsFlickr from '../../../actions/flickr'
import _ from 'lodash'

import style from './index.scss'

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imagesLoading: true,
      pageNumber: null
    }
  }

  componentDidMount() {
    const pageNumber = this.props.location.pathname.split('/')[2]
    this.setState({ pageNumber })
    actionsFlickr.getPhotos(this.props.dispatch, "New York", pageNumber)
  }

  componentDidUpdate() {
    const pageNumber = this.props.location.pathname.split('/')[2]
    if (this.state.pageNumber !== pageNumber) {
      this.setState({
        imagesLoading: true
      })
      actionsFlickr.getPhotos(this.props.dispatch, "New York", pageNumber)
      this.setState({ pageNumber })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.photos.length > 0 && !nextProps.photosPending) {
      this.setState({
        photos: nextProps.photos,
        imagesLoading: false
      })
    }
  }

  getPhotos = (pageNumber) => {
    actionsFlickr.getPhotos(this.props.dispatch, "New York", pageNumber)
    this.setState({ pageNumber })
  }

  setupColumns = (photos) => {
    return _.map(photos, (chunk, index)=> {
      return <Column key={`column${index}`} data={chunk}/>
    })
  }

  getLoading = () => {
    return (
      <div className={style.loading}>
        <h2>Photos are being dispatched from Flickr...</h2>
        <h3>Please wait</h3>
        <div className={style.spinner}>
          <BounceLoader color={'black'}/>
        </div>
      </div>
    )
  }


  render() {
    const photos = this.state.photos && _.chunk(this.state.photos, 5)
    return (
      <div className={style.container}>
        <Pagination />
        <div className={style.gallery}>
          <div className={style.row}>
          {
            this.state.imagesLoading ?
              this.getLoading() :
              this.setupColumns(photos)
          }
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    photos: state.flickr.photos,
    photosPending: state.flickr.photosPending
  }
}

export default connect(mapStateToProps)(Gallery)
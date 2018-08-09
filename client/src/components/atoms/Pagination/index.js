import React from 'react'
import {
  NavLink
} from 'react-router-dom'
import style from './index.scss'

class Pagination extends React.Component {
  render() {
    return (
      <div className={style.pagination}>
        <ul className={style.pages}>
          <li className={style.separator}>
            <NavLink exact activeClassName={style.active} className={style.nav} to={`/gallery/${1}`}>1</NavLink>
          </li>
          <li className={style.separator}>
            <NavLink exact activeClassName={style.active} className={style.nav} to={`/gallery/${2}`}>2</NavLink>
          </li>
          <li className={style.separator}>
            <NavLink exact activeClassName={style.active} className={style.nav} to={`/gallery/${3}`}>3</NavLink>
          </li>
          <li className={style.separator}>
            <NavLink exact activeClassName={style.active} className={style.nav} to={`/gallery/${4}`}>4</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName={style.active} className={style.nav} to={`/gallery/${5}`}>5</NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default Pagination
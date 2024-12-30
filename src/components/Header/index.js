import {IoCartOutline} from 'react-icons/io5'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {name, cartCount} = props

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="headerContainer">
      <Link to="/" className="homeLink">
        <h4 className="restaurantName">{name}</h4>
      </Link>
      <div className="orderContainer">
        <p className="order">My Orders</p>
        <div className="cartContainer">
          <Link to="/cart">
            <button type="button" className="cartButton">
              <IoCartOutline size="30" />
            </button>
          </Link>
          <p className="countCart"> {cartCount}</p>
          <button
            type="button"
            className="logoutButton"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)

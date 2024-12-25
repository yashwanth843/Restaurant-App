import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {name, cartItems, cartCount} = props
  return (
    <nav className="headerContainer">
      <h4 className="restaurantName">{name}</h4>
      <div className="orderContainer">
        <p className="order">My Orders</p>
        <div className="cartContainer">
          <button type="button" className="cartButton">
            <IoCartOutline size="30" />
          </button>
          <p className="countCart"> {cartCount}</p>
        </div>
      </div>
    </nav>
  )
}

export default Header

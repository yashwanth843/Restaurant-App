import CartItems from '../CartItems'
import CartContext from '../../context/CartContext'
import './index.css'

const CartView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const islength = cartList.length > 0
      console.log(islength)
      return islength ? (
        <ul className="cartOrderList">
          {cartList.map(items => (
            <CartItems cartDetails={items} key={items.dishId} />
          ))}
        </ul>
      ) : (
        <div className="emptyContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="emptyCart"
            className="emptyImage"
          />
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartView

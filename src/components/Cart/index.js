import Header from '../Header'
import CartView from '../CartView'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllCartItems} = value
      const onClickAllRemove = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cartContainer">
            <div className="cartContent">
              <h1 className="cartHeading">My Cart</h1>
              <button
                type="button"
                className="removeAll"
                onClick={onClickAllRemove}
              >
                Remove All
              </button>
              <CartView />
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart

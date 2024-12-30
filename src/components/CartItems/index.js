import CartContext from '../../context/CartContext'
import './index.css'

const CartItems = props => {
  const {cartDetails} = props
  const {
    dishId,
    dishImage,
    dishName,
    dishPrice,
    quantity,
    dishCurrency,
  } = cartDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {
          deleteCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const onClickDelete = () => {
          deleteCartItem(dishId)
        }

        const onClickIncrease = () => {
          incrementCartItemQuantity(dishId)
        }

        const onClickDecrease = () => {
          decrementCartItemQuantity(dishId)
        }

        return (
          <li className="CartItemsList">
            <div className="cartItemsContainer">
              <h4 className="foodName">{dishName}</h4>
              <p className="price">
                {dishCurrency} {quantity * dishPrice.toFixed(2)}
              </p>
              <div className="dishIncrement">
                <button
                  type="button"
                  className="increase"
                  onClick={onClickIncrease}
                  data-testid="cart"
                >
                  +
                </button>
                <p className="count">{quantity}</p>
                <button
                  type="button"
                  className="increase"
                  onClick={onClickDecrease}
                  data-testid="cart"
                >
                  -
                </button>
              </div>
              <button
                type="button"
                className="delete"
                onClick={onClickDelete}
                data-testid="cart"
              >
                Remove
              </button>
            </div>
            <img src={dishImage} alt={dishName} className="dishImage" />
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItems

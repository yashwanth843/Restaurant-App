import CartContext from '../../context/CartContext'
import './index.css'

const DishItems = props => {
  const {tabs = [], addCart, removeCart, cartItems} = props // Provide default value for `tabs`

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        return (
          <ul>
            {tabs.map(each => {
              const cartItem = cartItems.find(
                item => item.dishId === each.dishId,
              )
              const quantity = cartItem ? cartItem.quantity : 0
              const isGreater = quantity > 0
              const onClickAddButton = () => {
                addCartItem({...each, quantity})
              }

              return (
                <li className="dishItems" key={each.dishId}>
                  <div>
                    <h4>{each.dishName}</h4>
                    <p>
                      {each.dishCurrency} {each.dishPrice}
                    </p>
                    <p className="dishDescription">{each.dishDescription}</p>
                    {each.dishAvailability ? (
                      <>
                        <div className="incrementContainer">
                          <button
                            type="button"
                            className="incrementButton"
                            onClick={() => removeCart(each)}
                            disabled={quantity === 0}
                          >
                            -
                          </button>
                          <p className="counter">{quantity}</p>
                          <button
                            type="button"
                            className="incrementButton"
                            onClick={() => addCart(each)}
                          >
                            +
                          </button>
                        </div>
                        {isGreater && (
                          <button
                            type="button"
                            className="addButton"
                            onClick={onClickAddButton}
                          >
                            ADD TO CART
                          </button>
                        )}
                        {each.addonCat?.length > 0 && (
                          <p className="addonCat">Customizations available</p>
                        )}
                      </>
                    ) : (
                      <p className="notPresent">Not Available</p>
                    )}
                  </div>

                  <p className="calories">{each.dishCalories} Calories</p>
                  <img src={each.dishImage} alt="dish" className="image" />
                </li>
              )
            })}
          </ul>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItems

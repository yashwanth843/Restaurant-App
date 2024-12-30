import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import CartContext from './context/CartContext'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import './App.css'

class App extends Component {
  state = {cartList: []}

  addCartItem = items => {
    const {cartList} = this.state
    const isAlreadyExist = cartList.findIndex(
      item => item.dishId === items.dishId,
    )
    if (isAlreadyExist === -1) {
      this.setState(prevState => ({cartList: [...prevState.cartList, items]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.dishId === items.dishId
            ? {...item, quantity: item.quantity + items.quantity}
            : item,
        ),
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  deleteCartItem = removeId => {
    const {cartList} = this.state
    const filtedRemove = cartList.filter(item => item.dishId !== removeId)
    this.setState({
      cartList: filtedRemove,
    })
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    }))
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          deleteCartItem: this.deleteCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App

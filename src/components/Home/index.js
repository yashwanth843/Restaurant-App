import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import DishItems from '../DishItems'
import './index.css'

const apiStautsContant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    restaurantData: [],
    restaurantName: '',
    apiStauts: apiStautsContant.initial,
    tabDetails: [],
    cartItems: [],
    activeTabId: '',
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    this.setState({apiStauts: apiStautsContant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({restaurantName: data[0].restaurant_name})
      const updatedData = data[0].table_menu_list.map(each => ({
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        categoryDishes: each.category_dishes.map(eachItem => ({
          addonCat: eachItem.addonCat,
          dishAvailability: eachItem.dish_Availability,
          dishType: eachItem.dish_Type,
          dishCalories: eachItem.dish_calories,
          dishCurrency: eachItem.dish_currency,
          dishDescription: eachItem.dish_description,
          dishId: eachItem.dish_id,
          dishImage: eachItem.dish_image,
          dishName: eachItem.dish_name,
          dishPrice: eachItem.dish_price,
          quantity: 0,
        })),
      }))
      this.setState({
        restaurantData: updatedData,
        apiStauts: apiStautsContant.success,
        tabDetails: updatedData[0].categoryDishes,
        activeTabId: updatedData[0].menuCategoryId,
      })
    } else {
      this.setState({apiStauts: apiStautsContant.failure})
    }
  }

  getCartCount = () => {
    const {cartItems} = this.state
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  addItemToCart = dish => {
    const {cartItems} = this.state

    const existingDishIndex = cartItems.findIndex(
      item => item.dishId === dish.dishId,
    )

    if (existingDishIndex === -1) {
      const newDish = {...dish, quantity: 1}
      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, newDish],
      }))
    } else {
      const updatedCartItems = cartItems.map(item =>
        item.dishId === dish.dishId
          ? {...item, quantity: item.quantity + 1}
          : item,
      )
      this.setState({cartItems: updatedCartItems})
    }
  }

  decrementItemFromCart = dish => {
    const {cartItems} = this.state

    const existingDishIndex = cartItems.findIndex(
      item => item.dishId === dish.dishId,
    )

    if (existingDishIndex !== -1) {
      const updatedCartItems = cartItems
        .map(item => {
          if (item.dishId === dish.dishId && item.quantity > 0) {
            return {...item, quantity: item.quantity - 1}
          }
          return item
        })
        .filter(item => item.quantity > 0)

      this.setState({cartItems: updatedCartItems})
      console.log(updatedCartItems)
    }
  }

  onClickButton = tab => {
    const {restaurantData} = this.state
    const result = restaurantData.find(each => each.menuCategory === tab)
    this.setState({
      tabDetails: result.categoryDishes,
      activeTabId: result.menuCategoryId,
    })
  }

  renderSuccessView = () => {
    const {
      restaurantData,
      tabDetails,
      activeTabId,
      cartItems,
      restaurantName,
    } = this.state
    return (
      <div className="maindishContainer">
        <Header name={restaurantName} cartCount={this.getCartCount()} />
        <ul className="dishUnorder">
          {restaurantData.map(each => (
            <li className="listDish">
              <button
                type="button"
                className={`tabButton ${
                  activeTabId === each.menuCategoryId ? 'activeTab' : ''
                }`}
                onClick={() => this.onClickButton(each.menuCategory)}
              >
                {each.menuCategory}
              </button>
            </li>
          ))}
        </ul>
        <ul className="dishItemsContainer">
          <DishItems
            tabs={tabDetails}
            addCart={this.addItemToCart}
            removeCart={this.decrementItemFromCart}
            cartItems={cartItems}
          />
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loaderContainer">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderResult = () => {
    const {apiStauts} = this.state
    switch (apiStauts) {
      case apiStautsContant.success:
        return this.renderSuccessView()
      case apiStautsContant.inProgress:
        return this.renderLoadingView()
      default:
        return ''
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="mainContainer">
        <div className="secondContainer">{this.renderResult()}</div>
      </div>
    )
  }
}

export default Home

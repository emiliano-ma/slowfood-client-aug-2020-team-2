import React, { Component } from "react";
import { getProducts } from "../modules/menu";
import { createOrder, updateOrder } from "../modules/order";

class MenuList extends Component {
  state = {
    menuList: [],
    orderResponse: {},
    currentOrder: {},
    showOrder: false
  };

  componentDidMount() {
    this.getMenuList();
  }

  async getMenuList() {
    let result = await getProducts();
    this.setState({ menuList: result });
  }
  addToOrder = async (e) => {
    let productId = e.target.parentElement.dataset.id;
    let result;

    if (this.state.currentOrder.id) { 
      result = await updateOrder(productId, this.state.currentOrder.id);
    } else {
      result = await createOrder(productId);
    }

    this.setState({
      orderResponse: { id: productId, message: result.message },
      currentOrder: result.order
    });
  };

  render() {
    let menu;
    let authenticated = this.props.authenticated;
    const order = this.state.currentOrder;

    let viewOrder;
    let showOrder;

    if (this.state.currentOrder.id) {
      viewOrder = <button onClick={() => this.setState({showOrder: true})}>View Order</button>
    }

    if (this.state.showOrder) {
      showOrder = (
        <div data-cy="order-details">
          <p data-cy="order-total">Total: {order.total}</p>
          <ui>
          {order.products.map(product => {
            return <li>{product.amount}x {product.name}</li>
          })}
          </ui>
        </div>
      )

    }

    if (this.state.menuList.length > 0) {
      menu = this.state.menuList.map((product) => {
        return (
          <div data-id={product.id} data-cy={"product-" + product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            {authenticated && (
              <button onClick={this.addToOrder}>Add to order</button>
            )}
            {product.id == parseInt(this.state.orderResponse.id) && (
              <p id="message">{this.state.orderResponse.message}</p>
            )}
          </div>
        );
      });
    }

    return (
      <>
        {viewOrder}
        {showOrder}
        <div>{menu}</div>
      </>
    );
  }
}

export default MenuList;

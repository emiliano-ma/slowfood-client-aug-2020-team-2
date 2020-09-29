import React, { Component } from "react";
import { getProducts } from "../modules/menu";
import { createOrder, updateOrder } from "../modules/order";

class MenuList extends Component {
  state = {
    menuList: [],
    orderResponse: {},
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

    if (this.state.orderId) {
      result = await updateOrder(productId, this.state.orderId);
    } else {
      result = await createOrder(productId);
    }

    this.setState({
      orderResponse: { id: productId, message: result.message },
      orderId: result.order_id,
    });
  };

  render() {
    let menu;
    let authenticated = this.props.authenticated;
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
        <div>{menu}</div>
      </>
    );
  }
}

export default MenuList;

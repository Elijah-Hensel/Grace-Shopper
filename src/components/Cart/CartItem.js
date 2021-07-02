import React, { useState } from "react";
import { TrashCan } from "../../Img";
import { updateProductQuantity, removeItemFromCart } from "../../api";
const CartItem = ({ index, token, item, cart, setCart }) => {
  const { id, name, description, image_url, quantity, price } = item;
  const [ItemQuantity, setItemQuantity] = useState(quantity);

  const handleQuantityChange = async (event) => {
    const value = event.target.value;
    if (value < 0) {
      setItemQuantity(ItemQuantity);
    } else {
      setItemQuantity(value);
    }
  };
  const handleProductRemove = async () => {
    try {
      if (token) {
        await removeItemFromCart(id, token);
      }
      const updatedCart = [...cart];
      updatedCart.splice(index, 1);
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const DBUpdateQuantity = async (event) => {
    try {
      if (token) {
        await updateProductQuantity(id, ItemQuantity, token);
      }
      const updatedProducts = [...cart];
      updatedProducts[index].quantity = ItemQuantity;
      setCart(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="CartCard">
      <img className="productImg" src={image_url} />
      <div className="CartCardInfo">
        <h1 className="name">{name}</h1>
        <p className="description">{description}</p>
      </div>
      <div className="QuantityContainer">
        <input
          className="QuantityInput"
          type="number"
          value={ItemQuantity}
          min="0"
          oninput="validity.valid||(value='')"
          onChange={(event) => {
            handleQuantityChange(event);
          }}
          onBlur={(event) => {
            DBUpdateQuantity(event);
          }}
        />
      </div>
      <p className="price">${(price * ItemQuantity).toFixed(2)}</p>
      <img
        className="deleteIcon"
        src={TrashCan}
        onClick={() => {
          handleProductRemove();
        }}
      />
    </div>
  );
};

export default CartItem;

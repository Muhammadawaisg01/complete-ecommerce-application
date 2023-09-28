

import axios from "axios";
import { ADD_TO_CART } from "../constants/cartConstants";
// import store from "../store";

// add items to cart
export const addItemsToCart = (id, quantity) => async (dispatch) => {

    const { data } = await axios.get(`/api/v1/product/${id}`);

    const obj = {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        //   image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
    }


    let available_cartItems = JSON.parse(localStorage.getItem('cartItems'));


    if (available_cartItems == null || typeof (available_cartItems) == 'undefined') {
        available_cartItems = [];
        available_cartItems.push(obj);
        localStorage.setItem("cartItems", JSON.stringify(available_cartItems));
    }
    else {
        const isItemExist = available_cartItems.find((item) => {
            return item.product === obj.product;
        })

        if (typeof (isItemExist) === 'undefined') {     // to add new item into cart Items 
            available_cartItems = [...available_cartItems, obj];
            localStorage.setItem("cartItems", JSON.stringify(available_cartItems));
        }
        else {      // to update the quantity of existing item
            available_cartItems = available_cartItems.map((i) => {
                return i.product === isItemExist.product ? obj : i;
            })
            localStorage.setItem("cartItems", JSON.stringify(available_cartItems));
        }
    }

    dispatch({
        type: ADD_TO_CART,
        payload: {
            available_cartItems,
        }
    })

}


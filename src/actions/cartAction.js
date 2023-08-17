
import axios from "axios"
import { ADD_TO_CART } from "../constants/cartConstants";
import store from "../store";

// add items to cart
export const addItemsToCart = (id, quantity) => async (dispatch) => {

    const { data } = await axios.get(`/api/v1/product/${id}`);
    console.log("I AM the data in cart action    ", data);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            //   image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(store.getState().cart.cartItems));

}



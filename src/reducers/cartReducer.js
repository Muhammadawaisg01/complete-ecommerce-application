
import { ADD_TO_CART } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:

            const item = action.payload;

            const isItemExist = state.cartItems.find(
                (i) =>
                    // console.log(item.product);
                    // console.log(i.product);
                    i.product === item.product
            );
            console.log("I am the itemExist   ", isItemExist);
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        default:
            return {
                state
            }
    }
}

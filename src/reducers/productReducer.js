
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS
} from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage
            }
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }

};

export const ProductDetailsReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case PRODUCTS_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case PRODUCTS_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
            }
        case PRODUCTS_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

import axios from "axios";

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_FAIL,
    PRODUCTS_DETAILS_SUCCESS,
} from "../constants/productConstants"


export const getProduct = (keyword = "", price = [0, 25000], currentPage = 1, category) => async (dispatch) => {

    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        const { data } = await axios.get(`api/v1/products?price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}`);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCTS_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        console.log("An error occured    ", error);
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}




import axios from "axios";
import {
    CLEAR_ERRORS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants";

// User Login
export const userLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { Headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post("api/v1/login",
            { email, password },
            config
        )
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Register New User
export const registerUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { Headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(`/api/v1/register`, { name, email, password }, config);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`api/v1/me`);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });

    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
}

export const logout = () => async (dispatch) => {

    await axios.get(`api/v1/logout`);
    try {
        dispatch({ type: LOGOUT_SUCCESS })

    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
}

// update user profile
export const updateProfile = (name, email) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { Headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v1/me/update`, { name, email }, config);

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        })
        console.log("I am data.success in action   ", data.success);

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// update user password
export const updatePassword = (passwords) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { Headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/password/update`, { passwords }, config);

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}


import { Typography } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import "../../styles/Cart.css";

const Cart = () => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    return (
        <>
            {cartItems?.length === 0 ? (
                <div className='emptyCart'>
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <>
                    <div className='cartPage'>
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

export default Cart
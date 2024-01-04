
import React, { useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import "../../styles/Home.css"
import Metadata from "../layout/Metadata"
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../actions/productAction'
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert"
import ProductCard from '../Product/ProductCard'


const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            // dispatch(clear);
        }
        dispatch(getProduct());

    }, [dispatch])

    return (
        <>
            <Metadata title="Home" />
            {
                loading
                    ?
                    <Loader /> : <>
                        <div className='banner'>
                            <p>WELCOME TO ECOMMERCE</p>
                            <h1>FIND AMAZING PRODUCTS BELOW</h1>
                            <a href='#container'>
                                <button>
                                    Scroll <CgMouse />
                                </button>
                            </a>
                        </div>
                        <h2 className='homeHeading'> Featured Products </h2>
                        <div className='container' id="container">
                            {
                                products && products.map((product) => (
                                    <ProductCard product={product} />
                                ))
                            }

                        </div>
                    </>
            }

        </>
    )
}

export default Home


import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction"
import Loader from '../layout/Loader/Loader';
import Metadata from '../layout/Metadata';
import "../../styles/Products.css"
import ProductCard from './ProductCard';
import Typography from "@material-ui/core/Typography"
import { Slider } from '@material-ui/core';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"

const Products = () => {

    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);


    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resultPerPage } = useSelector(state => state.products)

    const priceHandler = (event, price) => {
        setPrice(price);
    }

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const { keyword } = useParams();

    useEffect(() => {
        if (error) {
            alert.error(error.message);
            // dispatch
        }
        dispatch(getProduct(keyword, price, currentPage, category));

    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

    return (
        <>
            {loading ? (<Loader />)
                :
                (
                    <>
                        <Metadata title="PRODUCTS -- ECOMMERCE" />
                        <h2 className="productsHeading">Products</h2>
                        <div className='products'>
                            {products && products.map(product => {
                                return <ProductCard key={product._id} product={product} />
                            })}
                        </div>

                        <div className='filterbox'>
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="on"
                                aria-labelledby="range-slider"
                                min={0}
                                max={25000}
                            />
                        </div>
                        {resultPerPage < productsCount && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}
                    </>
                )
            }
        </>
    )
}

export default Products;
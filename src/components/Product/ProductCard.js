
import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"


const ProductCard = ({ product }) => {
    const options = {
        edit: false,
        isHalf: true,
        value: product.rating,
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25
    }

    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src='' alt='Product image' />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span>({product.numOfReviews})</span>
            </div>
            <span>{product.price}</span>
        </Link>
    )
}

export default ProductCard
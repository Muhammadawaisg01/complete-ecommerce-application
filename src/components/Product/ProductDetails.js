
import React, { useEffect, useState } from 'react';
import Carousel from "react-material-ui-carousel";
import "../../styles/ProductDetails.css"
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from "../../actions/productAction"
import { useParams } from 'react-router-dom';
import { Rating } from "@material-ui/lab";
import { useAlert } from "react-alert";
import { addItemsToCart } from '../../actions/cartAction';

const ProductDetails = ({ }) => {

    const alert = useAlert();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails);

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const options = {
        size: "large",
        value: 1,
        readOnly: true,
        precision: 0.5,
    };

    useEffect(() => {

        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const increaseQuantity = () => {
        if (product.Stock <= quantity) {
            return;
        }

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) {
            return
        };

        const qty = quantity - 1;
        setQuantity(qty);
    };

    let numberOfCount = 1;
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));

        alert.success("Item Added To Cart");

        // localStorage.setItem(numberOfCount, numberOfCount += 1);
        // let count = localStorage.getItem(numberOfCount);
        // console.log(count);
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    return (
        <>
            <div>
                <Carousel>
                    {product.images &&
                        product.images.map((item, i) => (
                            <img
                                className="CarouselImage"
                                key={i}
                                src={item.url}
                                alt={`${i} Slide`}
                            />
                        ))}
                </Carousel>
            </div>

            <div className='mainDiv'>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <Rating {...options} />
                    <span className="detailsBlock-2-span">
                        {" "}
                        ({product.numOfReviews} Reviews)
                    </span>
                </div>
                <div className="detailsBlock-3">
                    <h1>{`₹${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly type="number" value={quantity} />
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button
                            disabled={product.Stock < 1 ? true : false}
                            onClick={addToCartHandler}
                        >
                            Add to Cart
                        </button>
                    </div>
                    <p>
                        Status:
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                    </p>
                </div>

                <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>
                </div>
                <button onClick={submitReviewToggle} className="submitReview">
                    Submit Review
                </button>
            </div>
            <h3 className="reviewsHeading">REVIEWS</h3>

            {/* <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
            >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                    <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                    />

                    <textarea
                        className="submitDialogTextArea"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog> */}

        </>
    )
}

export default ProductDetails;


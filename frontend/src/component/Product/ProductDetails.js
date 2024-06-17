import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearrErrors, getProductDetails,newReview } from "../../actions/productAction"
import  ReactStars  from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import Loader from "../layout/loader/loader"
import { addItemToCart } from "../../actions/cartAction"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";


const ProductDetails = ( ) => {
  const alert = useAlert();
    const { id }  =useParams();
   const dispatch = useDispatch();
   const { product, loading, error } = useSelector(
    (state) => state.productDetails
   );
   const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
   
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  
   const [quantity,setQuantity] = useState(1);
   const [open, setOpen] = useState(false);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");

   const increaseQuantity = () => {
    if(product.stock<=quantity) return;
    const qty = quantity + 1;

    setQuantity(qty);
  }
  
  
   const decreaseQuantity = () => {
    if(quantity<=0) return;
    const qty = quantity - 1;
    setQuantity(qty);
   }

   const addToCartHandler = () => {
    dispatch(addItemToCart(id,quantity));
    alert.success("Item successfully added to cart");
   }
   const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

   useEffect(() =>{

   if(error){
    alert.error(error);
    dispatch(clearrErrors());
   }
   
   if(reviewError){
    alert.error(reviewError);
    dispatch(clearrErrors());
   }
   if(success){
    alert.success("Review Submitted Succesfully");
    dispatch({type : NEW_REVIEW_RESET})
   }

    dispatch(getProductDetails(id));
   },[dispatch, id , error , alert,reviewError,success]);




   return (
    <Fragment>
      {loading ? (
        <Loader />
      ):
      (
        <Fragment>
        <div className = "ProductDetails">
        <div className="shadow-xl rounded-md bg-white">
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
             <div className="shadow-xl rounded-md bg-white">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numberOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
              <p>
                <span className="text-2xl font-bold text-red-700">{`₹${product.price}`}</span>
                  <span className="text-sm text-slate-900 line-through">{`₹${product.price+(product.price*0.1)}`}</span>
                </p>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" placeholder={quantity} value={quantity}/>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button disabled ={product.stock<1} onClick={addToCartHandler}>
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
             </div>
             <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button className="submitReview"  onClick={submitReviewToggle} >Submit Review</button>
             </div>
             
             </div>
             <h3 className="reviewsHeading">REVIEWS</h3>
             <Dialog
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
                className="submitDialogTextArea shadow-lg"
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
          </Dialog>
             {product.reviews && product.reviews[0] ? (
            <div className="reviews flex flex-row">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
    </Fragment>
      )}
    </Fragment>
   
   );
}

export default ProductDetails;


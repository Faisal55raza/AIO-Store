import React, { Fragment, useEffect } from "react";

import "./Home.css";
import ProductCard from  "./ProductCard"
import MetaData from "../layout/MetaData";
import { clearrErrors, getProduct } from "../../actions/productAction";
import { useSelector,useDispatch } from "react-redux";
import Loader from "../layout/loader/loader"
import { useAlert } from "react-alert";



const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products , productsCount } = useSelector(
        (state) => state.products
    );
    
    useEffect(() => {
        if(error){
         alert.error(error);
            dispatch(clearrErrors());
        }
        dispatch(getProduct());

    },[dispatch, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ): ( <Fragment>
        <MetaData title={"ECOMMERCE"} />
        <div className="banner shadow-lg back">
           

         <a href="#container">
         <button>
         Scroll 
          </button>
          </a>

        </div>
        <h2 className="homeHeading text-xl font-bold">FEATURED PRODUCTS</h2>
          
<div className="container" id="container">
{products && products.map((product) => <ProductCard product = {product} key = {product._id} />)}


  
</div>
</Fragment>)}
        </Fragment>


    );
}
export default Home;
import React , {Fragment, useEffect, useState} from "react";
import { useParams } from "react-router-dom"
import "./Products.css";
import { useSelector, useDispatch} from "react-redux";
import { clearrErrors,getProduct}  from "../../actions/productAction";
import Loader from "../layout/loader/loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";


const categories = [
  "Laptop",
  "SmartWatches",
  "Headphones",
  "Speakers",
  "Monitors",
  "Camera",
  "SmartPhones",
  ];

  const None="";

const Products = () =>{

    const dispatch = useDispatch();
    
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);

    const [price, setPrice] = useState([0,100000]);

    const [category, setCategory] = useState("");

    const [ratings, setRatings] = useState(0);

    const {keyword} = useParams();

    const [isOpen, setIsOpen] = useState(false);

    const toggleDiv = () => {
    setIsOpen(!isOpen);
     };

    const { products, loading ,error , productsCount,resultPerPage,filteredProductsCount } = useSelector(
        (state) => state.products
    );


    useEffect(() =>{
        if(error){
            alert.error(error);
            dispatch(clearrErrors);
        }
        
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
    },[dispatch,keyword,currentPage,price,category,ratings]);


    const setCurrentPageNo = (e) => {
           setCurrentPage(e);
    }

    const priceHandler = (event,newPrice) =>{
       setPrice(newPrice);
    }

    
   let count = filteredProductsCount;
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) :(<Fragment>
              <div className="flex flex-column fillter overflow-auto fixed  z-10  right-2" >
      
      {isOpen && (
        <div className="bg-white p-4 w-64 rounded border-solid border-2 border-sky-500" >
       
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
  
    <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
              <li
                  className="category-link"
                  key="None"
                  onClick={() => setCategory(None)}
                >
                  None
                </li>
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>        
            
        </div>
      )}
      <button 
        className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={toggleDiv}
      >
        Filter
      </button>
    </div>

            <div className="back">
       <h2 className="productsHeading">PRODUCTS</h2>

     <div className="products">
        {products &&
        products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
</div>
  
    {resultPerPage < count && <div className="paginationBox">
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
</div>}
</div>
            </Fragment>)}
        </Fragment>
    )
}
export default Products;


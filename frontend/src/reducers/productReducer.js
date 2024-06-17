import { ALL_PRODUCT_FAIL,
     ALL_PRODUCT_REQUEST,
      ALL_PRODUCT_SUCCESS,
      PRODUCT_DETAILS_FAIL,
      PRODUCT_DETAILS_REQUEST,
      PRODUCT_DETAILS_SUCCESS,NEW_REVIEW_REQUEST,
      NEW_REVIEW_FAIL,NEW_REVIEW_RESET,NEW_REVIEW_SUCCESS,
       CLEAR_ERRORS, 
       ADMIN_PRODUCT_REQUEST,
       ADMIN_PRODUCT_FAIL,
       ADMIN_PRODUCT_SUCCESS,
      NEW_PRODUCT_REQUEST,NEW_PRODUCT_FAIL,NEW_PRODUCT_RESET,NEW_PRODUCT_SUCCESS,
      DELETE_PRODUCT_REQUEST,
      DELETE_PRODUCT_SUCCESS,
      DELETE_PRODUCT_RESET,
      DELETE_PRODUCT_FAIL} from "../constants/productConstants";


export const productsReducer = (state = {products : [] },action) => {
    switch(action.type){
         case ALL_PRODUCT_REQUEST :
          case ADMIN_PRODUCT_REQUEST:
            return {
                loading : true,
                products : []
            };
            case ADMIN_PRODUCT_SUCCESS :
                  return {
                    loading : false,
                    products: action.payload,
                  };
                  
            case ALL_PRODUCT_SUCCESS :
                return {
                    loading : false,
                    products : action.payload.products,
                    productsCount : action.payload.productsCount,
                    resultPerPage : action.payload.resultPerPage,
                    filteredProductsCount : action.payload.filteredProductsCount
                };
                
                case ALL_PRODUCT_FAIL :
                  case ADMIN_PRODUCT_FAIL :
                    return {
                        loading : false,
                        error : action.payload,
                    };
              case CLEAR_ERRORS :
                    return {
                          ...state,
                          error : null,
                           };
                    default : 
                    return state;          
    }
};
export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.succes,
        product: action.payload.product,
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer  = (state = { },action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
          return {
            loading: true,
            ...state,
          };
        case NEW_REVIEW_SUCCESS:
          return {
            loading: false,
            success: action.payload,
          };
          case NEW_REVIEW_RESET:
          return {
            ...state,
            success: false,
          };
        case NEW_REVIEW_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
    
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;          
    }
};

export const productDetailsReducer = (state = { product : {} },action) => {
  switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload,
        };
      case PRODUCT_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;          
  }
};

export const productReducer  = (state = { },action) => {
  switch (action.type) {
      case DELETE_PRODUCT_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
        case DELETE_PRODUCT_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case DELETE_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;          
  }
};

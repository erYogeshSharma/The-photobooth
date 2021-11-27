import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, START_LOADING, END_LOADING, CREATE, UPDATE, DELETE } from '../constants/actionTypes.js';
export default (state =  {isLoading:true , posts: []}, action) => {    //post is the state, satate cant be left empoty we added a empty array
    // if(action.type === "create"){
    //      return [] 
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
            case END_LOADING:
                return { ...state, isLoading: false }
                case FETCH_ALL:
                    return {
                        ...state,
                        posts: action.payload.data,
                        currentPage: action.payload.currentPage,
                        numberOfPages: action.payload.numberofPages,
        
                    }
        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};
        case UPDATE:
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};

        case FETCH_BY_SEARCH: 
            return { ...state,posts: action.payload }
        case FETCH_POST:
            return { ...state,post: action.payload  }
        case CREATE:
            return {...state, posts: [ ...state.posts , action.payload]};
        default:
            return state;
    }
};

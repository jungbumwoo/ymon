import { categoryConstants } from "../actions/constants.js";

const initState = {
    categories: ['men', 'women'],
    loading: false,
    error: null
};

export default (state = initState, action ) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
    
        default:
            state = {
                ...initState
            }
            break;
    }
    return state
}

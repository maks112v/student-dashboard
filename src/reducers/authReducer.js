import {
    SIGNIN_INIT, SIGNIN_SUCCESS, SIGNIN_FAILED, SIGNIN_NEW_USER, LOGOUT_INIT,
    LOGOUT_SUCCESSFUL, LOGOUT_FAILED, AUTH_INIT, AUTH_SUCCESS, AUTH_FAILED,
} from "../actions";

const initialState = {
    isLoading: false,
    gettingUser: false,
    editingUser: false,
    uid: null,
    displayName: null,
    token: "",
    error: "",
};

export const authReducer = ( state = initialState, action ) => {
    switch( action.type ){
        case AUTH_INIT:
            return { ...state, isLoading: true };
        case AUTH_FAILED:
            return { ...state, isLoading: false };
        case AUTH_SUCCESS:
            
            return {
                ...state,
                isLoading: false,
                uid: action.payload.uid,
                displayName: action.payload.displayName
            };
        case SIGNIN_INIT:
            return { ...state, isLoading: true };
        case SIGNIN_NEW_USER:
            
            return {
                ...state, newUser: true, uid: action.payload, isLoading: false,
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                uid: action.payload,
                token: action.token,
            };
        case SIGNIN_FAILED:
            return { ...state, error: action.payload };
        
        case LOGOUT_INIT:
            return { ...state, isLoading: true, error: "" };
        case LOGOUT_SUCCESSFUL:
            return {
                ...state,
                isLoading: false,
                uid: null,
                user: null,
                newUser: false,
                token: "",
                error: "",
            };
        case LOGOUT_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        
        default:
            return state;
    }
};

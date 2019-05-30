import { store } from "../firebase.js";
import { cookieSave } from "./cookie";
import { action } from "./action";

export const FETCH_USER_BY_ID_INIT = "FETCH_USER_BY_ID_INIT";
export const FETCH_USER_BY_ID_SUCCESS = "FETCH_USER_BY_ID_SUCCESS";
export const FETCH_USER_BY_ID_FAILED = "FETCH_USER_BY_ID_FAILED";

export const getUserById = id => dispatch => {
    
    dispatch( action( FETCH_USER_BY_ID_INIT ) );
    store.collection( "students" )
        .doc( id )
        .get()
        .then( res => {
            if( res.exists ){
                const data = res.data();
                cookieSave( "code", data.id );
                dispatch( action( FETCH_USER_BY_ID_SUCCESS, data ) );
            }else{
                dispatch( action( FETCH_USER_BY_ID_FAILED,
                    "This user does not exist"
                ) );
            }
        } )
        .catch(
            err => dispatch( action( FETCH_USER_BY_ID_FAILED, err.message ) ) );
};

export const FETCH_USER_BY_USERNAME_INIT = "FETCH_USER_BY_USERNAME_INIT";
export const FETCH_USER_BY_USERNAME_SUCCESS = "FETCH_USER_BY_USERNAME_SUCCESS";
export const FETCH_USER_BY_USERNAME_FAILED = "FETCH_USER_BY_USERNAME_FAILED";

export const getUserByUserName = ( userName, password ) => dispatch => {

};

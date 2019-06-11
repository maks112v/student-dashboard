import firebase, { store } from "../firebase";
import { getUserById } from "./usersActions";
import { getAutoFillInit } from "./autofill";
import { push } from "connected-react-router";

export const GOOGLE_PROVIDER = "GOOGLE_PROVIDER";
export const GITHUB_PROVIDER = "GITHUB_PROVIDER";

const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

export const AUTH_INIT = "AUTH_INIT";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILED = "AUTH_FAILED";

export const checkAuth = () => dispatch => {
    
    dispatch( { type: AUTH_INIT } );
    const { currentUser } = firebase.auth();
    
    if( currentUser ){
        getUserById( currentUser.uid )( dispatch );
        getAutoFillInit()( dispatch );
        dispatch( {
            type: AUTH_SUCCESS, payload: currentUser,
        } );
    }else{
        
        dispatch( { type: AUTH_FAILED } );
        dispatch( push( "/" ) );
    }
};

export const SIGNIN_INIT = "SIGNIN_INIT";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_NEW_USER = "SIGNIN_NEW_USER";
export const SIGNIN_FAILED = "SIGNIN_FAILED";
export const NEW_USER = "NEW_USER";

export const signIn = authType => dispatch => {
    
    dispatch( { type: SIGNIN_INIT } );
    switch( authType ){
        case GOOGLE_PROVIDER:
            firebase
                .auth()
                .signInWithPopup( googleProvider )
                .then( function( result ){
                    
                    if( result.additionalUserInfo.isNewUser ){
                        
                        dispatch( {
                            type: SIGNIN_NEW_USER,
                            payload: result.user.uid,
                            token: result.credential.accessToken,
                        } );
                    }
                    getUserById( result.user.uid )( dispatch );
                } )
                .catch( function( error ){
                    dispatch( { type: SIGNIN_FAILED, payload: error.message } );
                } );
            return;
        case GITHUB_PROVIDER:
            firebase
                .auth()
                .signInWithPopup( githubProvider )
                .then( function( result ){
                    if( result.additionalUserInfo.isNewUser ){
                        dispatch( {
                            type: SIGNIN_NEW_USER,
                            payload: result.user.uid,
                            token: result.credential.accessToken,
                        } );
                    }else{
                        dispatch( {
                            type: SIGNIN_SUCCESS,
                            payload: result.user.uid,
                            token: result.credential.accessToken,
                        } );
                    }
                } )
                .catch( function( error ){
                    dispatch( { type: SIGNIN_FAILED, payload: error.message } );
                } );
            return;
        default:
            dispatch( { type: SIGNIN_FAILED } );
    }
};

export const LOGOUT_INIT = "LOGOUT_INIT";
export const LOGOUT_SUCCESSFUL = "LOGOUT_SUCCESSFUL";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const logout = () => dispatch => {
    dispatch( { type: LOGOUT_INIT } );
    firebase
        .auth()
        .signOut()
        .then( () => {
            dispatch( { type: LOGOUT_SUCCESSFUL } );
        } )
        .catch( err => {
            dispatch( { type: LOGOUT_FAILED, payload: err } );
        } );
};


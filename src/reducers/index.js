import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";
import { autofillReducer } from "./autofillReducer";
import { authReducer } from "./authReducer";

export default ( history ) => combineReducers( {
    users: usersReducer, autoFill: autofillReducer, auth: authReducer
} )
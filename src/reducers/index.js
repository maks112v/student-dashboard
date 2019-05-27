import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";
import { autofillReducer } from "./autofillReducer";

export default ( history ) => combineReducers( {
    users: usersReducer, autoFill: autofillReducer,
} )
import {
    FETCH_USER_BY_ID_INIT, FETCH_USER_BY_ID_FAILED, FETCH_USER_BY_ID_SUCCESS,
    FETCH_USER_BY_USERNAME_FAILED, FETCH_USER_BY_USERNAME_INIT,
    FETCH_USER_BY_USERNAME_SUCCESS, FETCH_STUDENT_LESSONS_FAILED,
    FETCH_STUDENT_LESSONS_INIT, FETCH_STUDENT_LESSONS_SUCCESS
} from "../actions";

const initialState = {
    fetchUserInit: false,
    fetchUserSuccess: false,
    fetchUserFailed: false,
    fetchStudentLessonsInit: false,
    fetchStudentLessonsSuccess: false,
    fetchStudentLessonsFailed: false,
    user: {},
    studentLessons: {},
    error: "",
};

export const usersReducer = ( state = initialState, action ) => {
    switch( action.type ){
        
        //FETCH USER BY USERNAME ------------------------------------------
        
        case FETCH_USER_BY_USERNAME_INIT:
            return {
                ...state,
                fetchUserInit: true,
                fetchUserSuccess: false,
                fetchUserFailed: false
            };
        case FETCH_USER_BY_USERNAME_SUCCESS:
            return {
                ...state,
                fetchUserInit: false,
                fetchUserSuccess: true,
                fetchUserFailed: false,
                user: action.payload,
            };
        case FETCH_USER_BY_USERNAME_FAILED:
            return {
                ...state,
                fetchUserInit: false,
                fetchUserSuccess: false,
                fetchUserFailed: true,
                user: {},
                error: action.payload,
            };
        
        //FETCH USER BY ID ----------------------------------------------
        
        case FETCH_USER_BY_ID_INIT:
            return {
                ...state,
                fetchUserInit: true,
                fetchUserSuccess: false,
                fetchUserFailed: false
            };
        case FETCH_USER_BY_ID_SUCCESS:
            return {
                ...state,
                fetchUserInit: false,
                fetchUserSuccess: true,
                fetchUserFailed: false,
                user: action.payload,
            };
        case FETCH_USER_BY_ID_FAILED:
            return {
                ...state,
                fetchUserInit: false,
                fetchUserSuccess: false,
                fetchUserFailed: true,
                user: {},
                error: action.payload,
            };
        
        //FETCH USER LESSONS ------------------------------------------------
        
        case FETCH_STUDENT_LESSONS_INIT:
            return {
                ...state,
                fetchStudentLessonsInit: true,
                fetchStudentLessonsSuccess: false,
                fetchStudentLessonsFailed: false
            };
        case FETCH_STUDENT_LESSONS_SUCCESS:
            return {
                ...state,
                fetchStudentLessonsInit: false,
                fetchStudentLessonsSuccess: true,
                fetchStudentLessonsFailed: false,
                studentLessons: action.payload,
            };
        case FETCH_STUDENT_LESSONS_FAILED:
            return {
                ...state,
                fetchStudentLessonsInit: false,
                fetchStudentLessonsSuccess: false,
                fetchStudentLessonsFailed: true,
                studentLessons: {},
                error: action.payload,
            };
        
        default:
            return state;
    }
};


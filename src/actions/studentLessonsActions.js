import { store } from "../firebase.js";
import { action } from "./action";

export const FETCH_STUDENT_LESSONS_INIT = "FETCH_STUDENT_LESSONS_INIT";
export const FETCH_STUDENT_LESSONS_SUCCESS = "FETCH_STUDENT_LESSONS_SUCCESS";
export const FETCH_STUDENT_LESSONS_FAILED = "FETCH_STUDENT_LESSONS_FAILED";

export const fetchSTudentLessons = student => dispatch => {
    dispatch( action( FETCH_STUDENT_LESSONS_INIT ) );
    store.collection( "students" )
        .doc( student.id ).collection( "lessons" )
        .get()
        .then( res => {
            if( !res.empty ){
                const studentLessons = {};
                res.docs.forEach( lesson => {
                    const data = lesson.data();
                    data.id = lesson.id;
                    studentLessons[ data.id ] = data;
                } );
                dispatch( action( FETCH_STUDENT_LESSONS_SUCCESS,
                    studentLessons
                ) );
            }else{
                dispatch( action( FETCH_STUDENT_LESSONS_FAILED,
                    "This user does not exist"
                ) );
            }
        } )
        .catch( err => dispatch( action( FETCH_STUDENT_LESSONS_FAILED,
            err.message
        ) ) );
};


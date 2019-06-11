import { store } from "../firebase";
import { action } from "./action";

export const getAutoFillInit = () => dispatch => {
    
    getAutoFillInstructors()( dispatch );
    getAutoFillTas()( dispatch );
    getAutoFillCourses()( dispatch );
    getAutoFillPMS()( dispatch );
};

export const GET_AUTOFILL_INSTRUCTORS_INIT = "GET_AUTOFILL_INSTRUCTORS_INIT";
export const GET_AUTOFILL_INSTRUCTORS_SUCCESS = "GET_AUTOFILL_INSTRUCTORS_SUCCESS";
export const GET_AUTOFILL_INSTRUCTORS_FAIL = "GET_AUTOFILL_INSTRUCTORS_FAIL";

export const getAutoFillInstructors = () => dispatch => {
    dispatch( action( GET_AUTOFILL_INSTRUCTORS_INIT ) );
    store.collection( "autoFill" ).doc( "web" ).collection( "instructors" )
        .get()
        .then( res => {
            if( !res.empty ){
                const instructors = {};
                res.docs.forEach( instructor => {
                    const data = instructor.data();
                    data.id = instructor.id;
                    instructors[ data.id ] = data;
                } );
                
                dispatch( action( GET_AUTOFILL_INSTRUCTORS_SUCCESS,
                    instructors
                ) );
            }else{
                dispatch( action( GET_AUTOFILL_INSTRUCTORS_FAIL,
                    "Error, unable to get autofill data for instructors."
                ) );
            }
        } )
        .catch( err => dispatch( action( GET_AUTOFILL_INSTRUCTORS_FAIL,
            err.message
        ) ) );
};

export const GET_AUTOFILL_SPRINTS_INIT = "GET_AUTOFILL_SPRINTS_INIT";
export const GET_AUTOFILL_SPRINTS_SUCCESS = "GET_AUTOFILL_SPRINTS_SUCCESS";
export const GET_AUTOFILL_SPRINTS_FAIL = "GET_AUTOFILL_SPRINTS_FAIL";

export const getAutoFillSprints = ( user ) => dispatch => {
    
    if( !user.course ){
        return;
    }
    dispatch( action( GET_AUTOFILL_SPRINTS_INIT ) );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "courses" )
        .doc( user.course )
        .collection( "sprints" )
        .get()
        .then( res => {
            
            if( !res.empty ){
                const sprints = {};
                res.docs.forEach( sprint => {
                    const data = sprint.data();
                    data.id = sprint.id;
                    data.course = user.course;
                    sprints[ data.id ] = data;
                    
                    getAutoFillLessonsForSprint( data )( dispatch );
                } );
                
                dispatch( action( GET_AUTOFILL_SPRINTS_SUCCESS, sprints ) );
            }else{
                dispatch( action( GET_AUTOFILL_SPRINTS_FAIL,
                    "Error, unable to get autofill data for sprints."
                ) );
            }
        } )
        .catch( err => {
            
            dispatch( action( GET_AUTOFILL_SPRINTS_FAIL, err.message ) );
        } );
};

export const GET_AUTOFILL_LESSONS_INIT = "GET_AUTOFILL_LESSONS_INIT";
export const GET_AUTOFILL_LESSONS_SUCCESS = "GET_AUTOFILL_LESSONS_SUCCESS";
export const GET_AUTOFILL_LESSONS_FAIL = "GET_AUTOFILL_LESSONS_FAIL";

export const getAutoFillLessonsForSprint = sprint => dispatch => {
    
    dispatch( action( GET_AUTOFILL_LESSONS_INIT ) );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "courses" )
        .doc( sprint.course )
        .collection( "sprints" )
        .doc( sprint.id )
        .collection( "lessons" )
        .get()
        .then( res => {
            debugger;
            if( !res.empty ){
                const lessons = {};
                res.docs.forEach( lesson => {
                    const data = lesson.data();
                    data.id = lesson.id;
                    lessons[ data.id ] = data;
                } );
                
                dispatch( action( GET_AUTOFILL_LESSONS_SUCCESS, lessons ) );
            }else{
                dispatch( action( GET_AUTOFILL_LESSONS_FAIL,
                    `Error, unable to get autofill data for ${ sprint.name } lessons.`
                ) );
            }
        } )
        .catch( err => {
            debugger;
            dispatch( action( GET_AUTOFILL_LESSONS_FAIL, err.message ) );
        } );
};

export const GET_AUTOFILL_TAS_INIT = "GET_AUTOFILL_TAS_INIT";
export const GET_AUTOFILL_TAS_SUCCESS = "GET_AUTOFILL_TAS_SUCCESS";
export const GET_AUTOFILL_TAS_FAIL = "GET_AUTOFILL_TAS_FAIL";

export const getAutoFillTas = () => dispatch => {
    dispatch( action( GET_AUTOFILL_TAS_INIT ) );
    store.collection( "autoFill" ).doc( "web" ).collection( "tas" )
        .get()
        .then( res => {
            if( !res.empty ){
                const tas = {};
                res.docs.forEach( ta => {
                    const data = ta.data();
                    data.id = ta.id;
                    tas[ data.id ] = data;
                } );
                
                dispatch( action( GET_AUTOFILL_TAS_SUCCESS, tas ) );
            }else{
                dispatch( action( GET_AUTOFILL_TAS_FAIL,
                    `Error, unable to get autofill data for the TA's.`
                ) );
            }
        } )
        .catch(
            err => dispatch( action( GET_AUTOFILL_TAS_FAIL, err.message ) ) );
};

export const GET_AUTOFILL_PMS_INIT = "GET_AUTOFILL_PMS_INIT";
export const GET_AUTOFILL_PMS_SUCCESS = "GET_AUTOFILL_PMS_SUCCESS";
export const GET_AUTOFILL_PMS_FAIL = "GET_AUTOFILL_PMS_FAIL";

export const getAutoFillPMS = () => dispatch => {
    dispatch( action( GET_AUTOFILL_PMS_INIT ) );
    store.collection( "users" )
        .get()
        .then( res => {
            if( !res.empty ){
                const pms = {};
                res.docs.forEach( pm => {
                    const data = pm.data();
                    data.id = pm.id;
                    pms[ data.id ] = data;
                } );
                
                dispatch( action( GET_AUTOFILL_PMS_SUCCESS, pms ) );
            }else{
                console.log( "Error: Unable to get PM's" );
                dispatch( action( GET_AUTOFILL_PMS_FAIL,
                    `Error, unable to get PMs.`
                ) );
            }
        } )
        .catch(
            err => dispatch( action( GET_AUTOFILL_PMS_FAIL, err.message ) ) );
};

export const GET_AUTOFILL_COURSES_INIT = "GET_AUTOFILL_COURSES_INIT";
export const GET_AUTOFILL_COURSES_SUCCESS = "GET_AUTOFILL_COURSES_SUCCESS";
export const GET_AUTOFILL_COURSES_FAIL = "GET_AUTOFILL_COURSES_FAIL";

export const getAutoFillCourses = () => dispatch => {
    
    dispatch( action( GET_AUTOFILL_COURSES_INIT ) );
    store.collection( "autoFill" ).doc( "web" ).collection( "courses" )
        .get()
        .then( res => {
            if( !res.empty ){
                const courses = {};
                res.docs.forEach( course => {
                    const data = course.data();
                    data.id = course.id;
                    courses[ data.id ] = data;
                } );
                
                dispatch( action( GET_AUTOFILL_COURSES_SUCCESS, courses ) );
            }else{
                console.log( "Error: Unable to get courses" );
                dispatch( action( GET_AUTOFILL_COURSES_FAIL,
                    `Error, unable to get courses.`
                ) );
            }
        } )
        .catch( err => {
            
            dispatch( action( GET_AUTOFILL_COURSES_FAIL, err.message ) );
        } );
};


import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import cookie from "react-cookies";
import { connect } from "react-redux";
import Welcome from "./Views/Welcome";
import AuthRoutes from "./AuthRoutes";
import { getAutoFill } from "./actions";
import "./App.scss";
import SignUp from "./Views/SignUp";

const Protected = ( { component: Component, ...rest } ) => ( <Route
    { ...rest }
    render={ props => cookie.load( "code" ) ? <Component { ...props } /> :
        <Redirect to="/verify"/> }
/> );

class App extends React.Component{
    
    componentDidMount(){
        debugger;
        if( cookie.load( "code" ) ){
            this.props.history.push( "/dashboard" );
        }
        this.props.getAutoFill();
        
    }
    
    componentWillUpdate( nextProps, nextState, nextContext ){
        debugger;
        if( nextProps.getTAsFailed || nextProps.getSprintsFailed ||
            nextProps.getLessonsFailed || nextProps.getInstructorsFailed ){
            console.log( "Something is wrong" );
            console.log( this.props.error );
        }
    }
    
    render(){
        return ( <Switch>
            <Route exact path="/verify"
                   render={ props => <Welcome { ...props } /> }
            />
            <Route path={ "/signup" }
                   render={ props => <SignUp { ...props } /> }
            />
            <Protected path="/"
                       component={ props => <AuthRoutes { ...props } /> }
            />
        </Switch> );
    }
}

const mstp = state => ( {
    instructors: state.autoFill.instructors,
    tas: state.autoFill.tas,
    sprints: state.autoFill.sprints,
    lessons: state.autoFill.lessons,
    getInstructorsInit: state.autoFill.getInstructorsInit,
    getInstructorsSuccess: state.autoFill.getInstructorsSuccess,
    getInstructorsFailed: state.getInstructorsFailed,
    getLessonsInit: state.autoFill.getLessonsInit,
    getLessonsSuccess: state.autoFill.getLessonsSuccess,
    getLessonsFailed: state.autoFill.getLessonsFailed,
    getSprintsInit: state.autoFill.getSprintsInit,
    getSprintsSuccess: state.autoFill.getSprintsSuccess,
    getSprintsFailed: state.autoFill.getSprintsFailed,
    getTAsInit: state.autoFill.getTAsInit,
    getTAsSuccess: state.autoFill.getTAsSuccess,
    getTAsFailed: state.autoFill.getTAsFailed,
    error: state.autoFill.error,
} );

export default connect( mstp, { getAutoFill } )( App );

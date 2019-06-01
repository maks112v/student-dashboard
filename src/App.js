import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { cookieGet } from "./actions/cookie";
import { connect } from "react-redux";
import Welcome from "./Views/Welcome";
import { getAutoFill, getUserById } from "./actions";
import "./App.scss";
import requireAuth from "./AuthRoutes";
import Dashboard from "./Views/Dashboard";
import Retro from "./Views/Retro";

const Protected = ( { component: Component, ...rest } ) => ( <Route
    { ...rest }
    render={ props => cookieGet( "code" ) ? <Component { ...props } /> :
        <Redirect to="/verify"/> }
/> );

class App extends React.Component{
    
    state = {
        redirected: false,
    };
    
    componentDidMount(){
        
        if( cookieGet( "code" ) ){
            this.props.getUserById( cookieGet( "code" ) );
        }
        this.props.getAutoFill();
        
    }
    
    componentWillUpdate( nextProps, nextState, nextContext ){
        
        if( nextProps.getTAsFailed || nextProps.getSprintsFailed ||
            nextProps.getLessonsFailed || nextProps.getInstructorsFailed ){
            console.log( "Something is wrong" );
            console.log( this.props.error );
        }
        
        if( nextProps.isAuthenticated && !nextState.redirected ){
            this.setState( { redirected: true } );
            this.props.history.push( "/dashboard" );
        }
        
        if( nextProps.fetchUserInit && nextState.redirected ){
            this.setState( { redirected: false } );
        }
    }
    
    render(){
        return ( <Switch>
            <Route exact path="/"
                   render={ props => <Welcome { ...props } /> }
            />
            <Route path="/dashboard"
                   component={ requireAuth( Dashboard,
                       this.props.isAuthenticated
                   ) }
            />
            <Route path="/retro"
                   component={ requireAuth( Retro,
                       this.props.isAuthenticated
                   ) }
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
    fetchUserInit: state.users.fetchUserInit,
    isAuthenticated: state.users.isAuthenticated,
    
} );

export default withRouter( connect( mstp,
    { getAutoFill, getUserById }
)(
    App ) );

import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { cookieGet } from "./actions/cookie";
import { connect } from "react-redux";
import Welcome from "./Views/Welcome";
import { getUserById, checkAuth } from "./actions";
import "./App.scss";
import requireAuth from "./AuthRoutes";
import Dashboard from "./Views/Dashboard";
import Retro from "./Views/Retro";
import firebase from "./firebase";

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
        
        this.unregisterAuthObserver = firebase.auth()
            .onAuthStateChanged( () => this.props.checkAuth() );
    }
    
    componentWillUnmount(){
        this.unregisterAuthObserver();
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
    getTAsFailed: state.autoFill.getTAsFailed,
    isAuthenticated: state.users.isAuthenticated,
    getSprintsFailed: state.autoFill.getSprintsFailed,
    getLessonsFailed: state.autoFill.getLessonsFailed,
    getInstructorsFailed: state.autoFill.getInstructorsFailed,
    fetchUserInit: state.autoFill.fetchUserInit,
} );

export default withRouter( connect( mstp, { getUserById, checkAuth } )( App ) );

import React from "react";
import { Switch, Route } from "react-router-dom";
import { store } from "./firebase";
import { connect } from "react-redux";
import Dashboard from "./Views/Dashboard";
import cookie from "react-cookies";
import { getUserById } from "./actions";
import Retro from "./Views/Retro";

class AuthRoutes extends React.Component{
    state = {
        code: cookie.load( "code" ),
        isLoading: true,
        firstName: "",
        lastName: "",
        github: "",
        lessons: null,
        autoFill: {
            sections: [], sprints: [], instructors: []
        }
    };
    
    componentWillUpdate( nextProps, nextState, nextContext ){
        debugger;
        if( nextState.autoFill.sections.length > 0 ){
            if( !nextState.lessons ){
                let lessons = [];
                nextState.autoFill.sections.forEach( ( section ) => {
                    lessons.push( {
                        title: section.name,
                        order: section.order,
                        isProject: section.isProject,
                        completed: false
                    } );
                } );
                nextState.autoFill.sprints.forEach( sprint => {
                    lessons.push( {
                        title: sprint.name,
                        order: sprint.order,
                        isProject: sprint.isProject,
                        completed: false
                    } );
                } );
                this.setState( { lessons } );
            }
        }
    }
    
    componentDidMount(){
        debugger;
    }
    
    render(){
        const sendData = {
            isLoading: this.state.isLoading,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            github: this.state.github,
        };
        return ( <Switch>
            <Route exact path="/retro"
                   render={ props => <Retro { ...props } { ...sendData }
                                            sections={ this.state.autoFill.sections }/> }/>
            <Route
                path="/"
                render={ props => <Dashboard { ...props } { ...sendData }
                                             lessons={ this.state.lessons }/> }
            />
        </Switch> );
    }
}

const mstp = state => ( {} );

export default connect( mstp, { getUserById } )( AuthRoutes );

import React from "react";
import { connect } from "react-redux";

export default function( ComposedComponent, isAuthenticated ){
    class Authenticate extends React.Component{
        
        componentDidMount(){
            
            this._checkAndRedirect();
        }
        
        componentDidUpdate(){
            
            this._checkAndRedirect();
        }
        
        _checkAndRedirect(){
            
            if( !isAuthenticated ){
                this.props.history.push( "/" );
            }
        }
        
        render(){
            return ( <ComposedComponent { ...this.props } /> );
        }
    }
    
    return Authenticate;
}
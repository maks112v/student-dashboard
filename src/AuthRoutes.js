import React from "react";

export default function( ComposedComponent, isAuthenticated ){
    class Authenticate extends React.Component{
        
        componentDidMount(){
            
            this.checkAndRedirect();
        }
        
        componentDidUpdate(){
            
            this.checkAndRedirect();
        }
        
        checkAndRedirect(){
            
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